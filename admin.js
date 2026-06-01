/* ==========================================================================
   UstaBul Admin Panel Controller
   Local Storage Persistent Configuration & Security
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  
  // Cache credentials baseline
  if (!localStorage.getItem("admin_password")) {
    localStorage.setItem("admin_password", "admin123");
  }

  // --- Auth Control ---
  const loginScreen = document.getElementById("login-screen");
  const dashboardScreen = document.getElementById("dashboard-screen");
  const loginForm = document.getElementById("login-form");
  const adminPasswordInput = document.getElementById("admin-password");
  const loginErrorAlert = document.getElementById("login-error-alert");
  const btnLogout = document.getElementById("btn-logout");
  const activeMasterIndicator = document.getElementById("active-master-indicator");
  
  function checkAuth() {
    if (sessionStorage.getItem("admin_authenticated") === "true") {
      loginScreen.style.display = "none";
      dashboardScreen.style.display = "flex";
      loadProfileData();
    } else {
      loginScreen.style.display = "flex";
      dashboardScreen.style.display = "none";
    }
  }

  // Auth Action
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const enteredPassword = adminPasswordInput.value;
      const storedPassword = localStorage.getItem("admin_password");
      
      if (enteredPassword === storedPassword) {
        sessionStorage.setItem("admin_authenticated", "true");
        loginErrorAlert.classList.remove("danger");
        loginPasswordError = false;
        checkAuth();
      } else {
        loginErrorAlert.classList.add("danger");
        adminPasswordInput.value = "";
      }
    });
  }

  // Logout Action
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      sessionStorage.removeItem("admin_authenticated");
      checkAuth();
    });
  }

  // --- Sidebar Tab Switches ---
  const menuButtons = document.querySelectorAll(".admin-menu-btn");
  const contentSections = document.querySelectorAll(".admin-section");

  menuButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // If it's the anchor link to visit site, let it default navigate
      if (btn.tagName === "A") return;
      
      menuButtons.forEach(b => b.classList.remove("active"));
      contentSections.forEach(sec => sec.classList.remove("active"));
      
      btn.classList.add("active");
      const targetId = btn.getAttribute("data-target");
      document.getElementById(targetId).classList.add("active");
    });
  });

  // ==========================================================================
  // --- Profile Data Management ---
  // ==========================================================================
  let currentProfile = null;

  // Form Fields Cache
  const profName = document.getElementById("prof-name");
  const profSurname = document.getElementById("prof-surname");
  const profTitle = document.getElementById("prof-title");
  const profSlogan = document.getElementById("prof-slogan");
  const profAbout = document.getElementById("prof-about");
  const profExp = document.getElementById("prof-exp");
  const profProjects = document.getElementById("prof-projects");
  const profPhone = document.getElementById("prof-phone");
  const profWhatsapp = document.getElementById("prof-whatsapp");
  const profEmail = document.getElementById("prof-email");
  const profAreas = document.getElementById("prof-areas");
  
  const servicesContainer = document.getElementById("services-container");
  const btnAddService = document.getElementById("btn-add-service");
  
  const priceUnit = document.getElementById("price-unit");
  const priceBase = document.getElementById("price-base");
  const optionsContainer = document.getElementById("options-container");
  const btnAddOption = document.getElementById("btn-add-option");
  
  const pwCurrent = document.getElementById("pw-current");
  const pwNew = document.getElementById("pw-new");
  const pwConfirm = document.getElementById("pw-confirm");
  
  const successAlert = document.getElementById("admin-success-alert");
  const errorAlert = document.getElementById("admin-error-alert");
  const btnSaveAll = document.getElementById("btn-save-all");

  // A. Load Data
  function loadProfileData() {
    // If local storage profile doesn't exist, load Seramik as default baseline
    const stored = localStorage.getItem("usta_custom_profile");
    if (stored) {
      currentProfile = JSON.parse(stored);
    } else {
      // Deep copy seramik template to prevent mutations to baseline
      currentProfile = JSON.parse(JSON.stringify(USTA_TEMPLATES.seramik));
    }
    
    // Set navbar indicator
    activeMasterIndicator.textContent = `${currentProfile.name} ${currentProfile.surname}`;
    
    // Populate form
    profName.value = currentProfile.name;
    profSurname.value = currentProfile.surname;
    profTitle.value = currentProfile.title;
    profSlogan.value = currentProfile.slogan;
    profAbout.value = currentProfile.about;
    profExp.value = currentProfile.experience;
    profProjects.value = currentProfile.projects;
    profPhone.value = currentProfile.phone;
    profWhatsapp.value = currentProfile.whatsapp;
    profEmail.value = currentProfile.email;
    profAreas.value = currentProfile.areas || "Tüm İstanbul (Anadolu & Avrupa)";
    
    // Services Populate
    renderServicesForm();
    
    // Pricing Calculator Populate
    priceUnit.value = currentProfile.pricing.unitName;
    priceBase.value = currentProfile.pricing.basePrice;
    renderPricingOptionsForm();
  }

  // B. Services Rendering & Edit Lojiği
  function renderServicesForm() {
    servicesContainer.innerHTML = "";
    currentProfile.services.forEach((srv, idx) => {
      const card = document.createElement("div");
      card.className = "admin-service-item";
      card.innerHTML = `
        <button class="btn-remove-service" data-index="${idx}" title="Bu hizmeti sil">&times;</button>
        <div class="form-row">
          <div class="form-group-admin" style="width:100%;">
            <label>Hizmet Başlığı</label>
            <input type="text" class="form-control-admin srv-title-input" value="${srv.title}" required>
          </div>
          <div class="form-group-admin" style="width:100%;">
            <label>İkon Sınıfı (FontAwesome)</label>
            <input type="text" class="form-control-admin srv-icon-input" value="${srv.icon || 'fa-wrench'}" placeholder="fa-bath, fa-paint-roller, fa-bolt...">
          </div>
        </div>
        <div class="form-group-admin" style="margin-bottom:0;">
          <label>Hizmet Açıklaması</label>
          <textarea class="form-control-admin srv-desc-input" rows="2" required>${srv.description}</textarea>
        </div>
      `;
      servicesContainer.appendChild(card);
    });

    // Remove buttons listeners
    servicesContainer.querySelectorAll(".btn-remove-service").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const index = parseInt(e.target.getAttribute("data-index"));
        currentProfile.services.splice(index, 1);
        renderServicesForm();
      });
    });
  }

  if (btnAddService) {
    btnAddService.addEventListener("click", () => {
      currentProfile.services.push({
        title: "Yeni Hizmet Başlığı",
        description: "Lütfen bu hizmet için kısa bir açıklama girin.",
        icon: "fa-wrench"
      });
      renderServicesForm();
      
      // Scroll to bottom
      servicesContainer.scrollTop = servicesContainer.scrollHeight;
    });
  }

  // C. Pricing Options Rendering & Edit Lojiği
  function renderPricingOptionsForm() {
    optionsContainer.innerHTML = "";
    currentProfile.pricing.options.forEach((opt, idx) => {
      const row = document.createElement("div");
      row.className = "admin-option-row";
      row.innerHTML = `
        <div class="form-group-admin" style="margin:0;">
          <input type="text" class="form-control-admin opt-name-input" value="${opt.name}" placeholder="Seçenek Adı (Örn: Moloz taşıma)" required>
        </div>
        <div class="form-group-admin" style="margin:0;">
          <input type="number" class="form-control-admin opt-price-input" value="${opt.price}" placeholder="Birim Fiyatı (TL)" required>
        </div>
        <button class="btn-remove-option" data-index="${idx}" title="Sil"><i class="fa-solid fa-trash"></i></button>
      `;
      optionsContainer.appendChild(row);
    });

    // Remove buttons listeners
    optionsContainer.querySelectorAll(".btn-remove-option").forEach(btn => {
      btn.addEventListener("click", (e) => {
        // Handle icon click propagation
        const button = e.target.closest(".btn-remove-option");
        const index = parseInt(button.getAttribute("data-index"));
        currentProfile.pricing.options.splice(index, 1);
        renderPricingOptionsForm();
      });
    });
  }

  if (btnAddOption) {
    btnAddOption.addEventListener("click", () => {
      currentProfile.pricing.options.push({
        name: "Yeni Ek Seçenek",
        price: 100
      });
      renderPricingOptionsForm();
    });
  }

  // D. Save All Settings Lojiği
  if (btnSaveAll) {
    btnSaveAll.addEventListener("click", () => {
      // Validate Profil tab fields
      if (!profName.value.trim() || !profSurname.value.trim() || !profTitle.value.trim() || !profPhone.value.trim()) {
        showFeedback(false, "Lütfen profil kısmındaki zorunlu alanları doldurun.");
        return;
      }

      // Read Profile tab info
      currentProfile.name = profName.value.trim();
      currentProfile.surname = profSurname.value.trim();
      currentProfile.title = profTitle.value.trim();
      currentProfile.slogan = profSlogan.value.trim();
      currentProfile.about = profAbout.value.trim();
      currentProfile.experience = profExp.value;
      currentProfile.projects = profProjects.value.trim();
      currentProfile.phone = profPhone.value.trim();
      currentProfile.whatsapp = profWhatsapp.value.trim();
      currentProfile.email = profEmail.value.trim();
      currentProfile.areas = profAreas.value.trim();

      // Read Services
      const serviceItems = servicesContainer.querySelectorAll(".admin-service-item");
      const updatedServices = [];
      let serviceValidationError = false;
      
      serviceItems.forEach(item => {
        const title = item.querySelector(".srv-title-input").value.trim();
        const icon = item.querySelector(".srv-icon-input").value.trim();
        const description = item.querySelector(".srv-desc-input").value.trim();
        
        if (!title || !description) {
          serviceValidationError = true;
        }
        updatedServices.push({ title, icon, description });
      });

      if (serviceValidationError) {
        showFeedback(false, "Lütfen hizmetler bölümündeki boş alanları doldurun.");
        return;
      }
      currentProfile.services = updatedServices;

      // Read Calculator Base info
      currentProfile.pricing.unitName = priceUnit.value.trim();
      currentProfile.pricing.basePrice = parseFloat(priceBase.value) || 0;

      // Read Calculator options
      const optionRows = optionsContainer.querySelectorAll(".admin-option-row");
      const updatedOptions = [];
      let optionValidationError = false;
      
      optionRows.forEach(row => {
        const name = row.querySelector(".opt-name-input").value.trim();
        const price = parseFloat(row.querySelector(".opt-price-input").value);
        
        if (!name || isNaN(price)) {
          optionValidationError = true;
        }
        updatedOptions.push({ name, price });
      });

      if (optionValidationError) {
        showFeedback(false, "Lütfen fiyat listesindeki boş alanları doldurun.");
        return;
      }
      currentProfile.pricing.options = updatedOptions;

      // Manage Password update (optional)
      if (pwCurrent.value) {
        const storedPw = localStorage.getItem("admin_password");
        if (pwCurrent.value !== storedPw) {
          showFeedback(false, "Mevcut şifreniz hatalı. Şifre değiştirilemedi, diğer ayarlar kaydedildi.");
          // Still proceed to save the rest, but alert the user.
        } else if (!pwNew.value || pwNew.value !== pwConfirm.value) {
          showFeedback(false, "Yeni şifreler eşleşmiyor veya boş. Şifre değiştirilemedi.");
        } else {
          localStorage.setItem("admin_password", pwNew.value);
          pwCurrent.value = "";
          pwNew.value = "";
          pwConfirm.value = "";
        }
      }

      // Save custom profile configuration to localStorage
      localStorage.setItem("usta_custom_profile", JSON.stringify(currentProfile));
      
      // Update indicators
      activeMasterIndicator.textContent = `${currentProfile.name} ${currentProfile.surname}`;
      
      showFeedback(true, "Değişiklikler başarıyla kaydedildi! Siteniz güncellendi.");
    });
  }

  function showFeedback(isSuccess, message) {
    if (isSuccess) {
      successAlert.textContent = message;
      successAlert.style.display = "block";
      errorAlert.style.display = "none";
      
      setTimeout(() => {
        successAlert.style.display = "none";
      }, 4000);
    } else {
      errorAlert.textContent = message;
      errorAlert.style.display = "block";
      successAlert.style.display = "none";
      
      setTimeout(() => {
        errorAlert.style.display = "none";
      }, 4000);
    }
    
    // Scroll window to top to see notifications
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Run initial Auth state check
  checkAuth();
});
