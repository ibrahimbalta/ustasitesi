/* ==========================================================================
   UstaBul Admin Panel Controller
   Local Storage Persistent Configuration & Security
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  
  // Cache credentials baseline
  if (!localStorage.getItem("admin_password") || localStorage.getItem("admin_password") === "admin123") {
    localStorage.setItem("admin_password", "6032balta");
  }

  // --- Dynamic Color Theme Application ---
  function applyThemeFromStorage() {
    const stored = localStorage.getItem("usta_custom_profile");
    let themeColor = "#0284c7"; // Default sky blue (Seramik)
    
    if (stored) {
      try {
        const profile = JSON.parse(stored);
        if (profile.themeColor) {
          themeColor = profile.themeColor;
        }
      } catch (e) {
        console.error("Error parsing custom profile:", e);
      }
    }
    applyThemeColor(themeColor);
  }

  function applyThemeColor(hex) {
    document.documentElement.style.setProperty("--primary-color", hex);
    
    const hoverColor = adjustHexBrightness(hex, -20);
    document.documentElement.style.setProperty("--primary-color-hover", hoverColor);
    
    const rgb = hexToRgb(hex);
    if (rgb) {
      document.documentElement.style.setProperty("--primary-color-rgb", `${rgb.r}, ${rgb.g}, ${rgb.b}`);
    }
  }

  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  function adjustHexBrightness(hex, percent) {
    let R = parseInt(hex.substring(1, 3), 16);
    let G = parseInt(hex.substring(3, 5), 16);
    let B = parseInt(hex.substring(5, 7), 16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;

    R = (R > 0) ? R : 0;
    G = (G > 0) ? G : 0;
    B = (B > 0) ? B : 0;

    const rHex = R.toString(16).padStart(2, '0');
    const gHex = G.toString(16).padStart(2, '0');
    const bHex = B.toString(16).padStart(2, '0');

    return `#${rHex}${gHex}${bHex}`;
  }

  // Run initial theme loading
  applyThemeFromStorage();

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

  // Password Visibility Toggle
  const togglePasswordBtn = document.getElementById("toggle-password");
  const togglePasswordIcon = document.getElementById("toggle-password-icon");
  
  if (togglePasswordBtn && adminPasswordInput && togglePasswordIcon) {
    togglePasswordBtn.addEventListener("click", () => {
      if (adminPasswordInput.type === "password") {
        adminPasswordInput.type = "text";
        togglePasswordIcon.classList.remove("fa-eye");
        togglePasswordIcon.classList.add("fa-eye-slash");
        togglePasswordBtn.title = "Şifreyi Gizle";
      } else {
        adminPasswordInput.type = "password";
        togglePasswordIcon.classList.remove("fa-eye-slash");
        togglePasswordIcon.classList.add("fa-eye");
        togglePasswordBtn.title = "Şifreyi Göster";
      }
    });
  }

  // Auth Action
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const enteredPassword = adminPasswordInput.value;
      const storedPassword = localStorage.getItem("admin_password");
      
      if (enteredPassword === storedPassword) {
        sessionStorage.setItem("admin_authenticated", "true");
        loginErrorAlert.classList.remove("show");
        checkAuth();
      } else {
        loginErrorAlert.classList.add("show");
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
  const profRating = document.getElementById("prof-rating");
  const profAvatar = document.getElementById("prof-avatar");
  const profAboutImg = document.getElementById("prof-about-img");
  const profPhone = document.getElementById("prof-phone");
  const profWhatsapp = document.getElementById("prof-whatsapp");
  const profEmail = document.getElementById("prof-email");
  const profAreas = document.getElementById("prof-areas");
  
  const servicesContainer = document.getElementById("services-container");
  const btnAddService = document.getElementById("btn-add-service");
  
  const baTitle = document.getElementById("ba-title");
  const baDesc = document.getElementById("ba-desc");
  const baLabelBefore = document.getElementById("ba-label-before");
  const baLabelAfter = document.getElementById("ba-label-after");
  const baImgBefore = document.getElementById("ba-img-before");
  const baImgAfter = document.getElementById("ba-img-after");
  
  const galleryContainer = document.getElementById("gallery-container");
  const btnAddGallery = document.getElementById("btn-add-gallery");
  
  const testimonialsContainer = document.getElementById("testimonials-container");
  const btnAddTestimonial = document.getElementById("btn-add-testimonial");
  
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
    
    // Apply dynamic branding theme colors
    applyThemeColor(currentProfile.themeColor || "#0284c7");
    
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
    profRating.value = currentProfile.rating || "4.9";
    profAvatar.value = currentProfile.avatar || "";
    profAboutImg.value = currentProfile.aboutImage || "";
    profPhone.value = currentProfile.phone;
    profWhatsapp.value = currentProfile.whatsapp;
    profEmail.value = currentProfile.email;
    profAreas.value = currentProfile.areas || "Tüm İstanbul (Anadolu & Avrupa)";
    
    // Services Populate
    renderServicesForm();
    
    // Before/After Populate
    if (currentProfile.beforeAfter) {
      baTitle.value = currentProfile.beforeAfter.title || "";
      baDesc.value = currentProfile.beforeAfter.description || "";
      baLabelBefore.value = currentProfile.beforeAfter.beforeLabel || "";
      baLabelAfter.value = currentProfile.beforeAfter.afterLabel || "";
      baImgBefore.value = currentProfile.beforeAfter.before || "";
      baImgAfter.value = currentProfile.beforeAfter.after || "";
    }
    
    // Gallery Populate
    renderGalleryForm();
    
    // Testimonials Populate
    renderTestimonialsForm();
    
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

  // D. Portfolyo Galerisi Rendering & Edit Lojiği
  function renderGalleryForm() {
    galleryContainer.innerHTML = "";
    if (!currentProfile.gallery) currentProfile.gallery = [];
    currentProfile.gallery.forEach((item, idx) => {
      const card = document.createElement("div");
      card.className = "admin-service-item";
      card.innerHTML = `
        <button class="btn-remove-service btn-remove-gallery" data-index="${idx}" title="Bu projeyi sil">&times;</button>
        <div class="form-row">
          <div class="form-group-admin" style="width:100%;">
            <label>Proje Başlığı</label>
            <input type="text" class="form-control-admin gal-title-input" value="${item.title}" required>
          </div>
          <div class="form-group-admin" style="width:100%;">
            <label>Kategori</label>
            <input type="text" class="form-control-admin gal-cat-input" value="${item.category}" placeholder="Örn: Banyo, Mutfak, Dış Mekan" required>
          </div>
        </div>
        <div class="form-group-admin" style="margin-bottom:0;">
          <label>Görsel URL'si (assets/dosya-adi.jpg veya web linki)</label>
          <input type="text" class="form-control-admin gal-image-input" value="${item.image}" required>
        </div>
      `;
      galleryContainer.appendChild(card);
    });

    // Remove buttons listeners
    galleryContainer.querySelectorAll(".btn-remove-gallery").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const index = parseInt(e.target.getAttribute("data-index"));
        currentProfile.gallery.splice(index, 1);
        renderGalleryForm();
      });
    });
  }

  if (btnAddGallery) {
    btnAddGallery.addEventListener("click", () => {
      if (!currentProfile.gallery) currentProfile.gallery = [];
      currentProfile.gallery.push({
        title: "Yeni Proje Görseli",
        category: "Genel",
        image: `assets/${currentProfile.id}-g1.jpg`
      });
      renderGalleryForm();
      galleryContainer.scrollTop = galleryContainer.scrollHeight;
    });
  }

  // E. Müşteri Yorumları Rendering & Edit Lojiği
  function renderTestimonialsForm() {
    testimonialsContainer.innerHTML = "";
    if (!currentProfile.testimonials) currentProfile.testimonials = [];
    currentProfile.testimonials.forEach((testi, idx) => {
      const card = document.createElement("div");
      card.className = "admin-service-item";
      
      // Build dynamic rating options
      let ratingOptionsHtml = "";
      for (let r = 5; r >= 1; r--) {
        ratingOptionsHtml += `<option value="${r}" ${parseInt(testi.rating) === r ? 'selected' : ''}>${r} Yıldız</option>`;
      }
      
      card.innerHTML = `
        <button class="btn-remove-service btn-remove-testimonial" data-index="${idx}" title="Bu yorumu sil">&times;</button>
        <div class="form-row">
          <div class="form-group-admin" style="width:100%;">
            <label>Müşteri Adı Soyadı</label>
            <input type="text" class="form-control-admin testi-name-input" value="${testi.name}" required>
          </div>
          <div class="form-group-admin" style="width:100%;">
            <label>Müşteri Konumu (İlçe, İl)</label>
            <input type="text" class="form-control-admin testi-loc-input" value="${testi.location}" placeholder="Örn: Kadıköy, İstanbul" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group-admin" style="width:100%;">
            <label>Yıldız Puanı</label>
            <select class="form-control-admin testi-rating-select" style="background-color: #0f172a; border-radius: var(--border-radius-sm); border: 1px solid rgba(255, 255, 255, 0.1);">
              ${ratingOptionsHtml}
            </select>
          </div>
          <div class="form-group-admin" style="width:100%;">
            <label>Tarih/Süre</label>
            <input type="text" class="form-control-admin testi-date-input" value="${testi.date || '1 hafta önce'}" placeholder="Örn: Dün veya 3 ay önce" required>
          </div>
        </div>
        <div class="form-group-admin" style="margin-bottom:0;">
          <label>Müşteri Yorumu</label>
          <textarea class="form-control-admin testi-comment-input" rows="2" required>${testi.comment}</textarea>
        </div>
      `;
      testimonialsContainer.appendChild(card);
    });

    // Remove buttons listeners
    testimonialsContainer.querySelectorAll(".btn-remove-testimonial").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const index = parseInt(e.target.getAttribute("data-index"));
        currentProfile.testimonials.splice(index, 1);
        renderTestimonialsForm();
      });
    });
  }

  if (btnAddTestimonial) {
    btnAddTestimonial.addEventListener("click", () => {
      if (!currentProfile.testimonials) currentProfile.testimonials = [];
      currentProfile.testimonials.push({
        name: "Yeni Müşteri",
        location: "İstanbul",
        comment: "Yapılan işçilikten son derece memnun kaldık, çok teşekkürler.",
        rating: 5,
        date: "Dün"
      });
      renderTestimonialsForm();
      testimonialsContainer.scrollTop = testimonialsContainer.scrollHeight;
    });
  }

  // F. Save All Settings Lojiği
  if (btnSaveAll) {
    btnSaveAll.addEventListener("click", () => {
      // Validate Profil tab fields
      if (!profName.value.trim() || !profSurname.value.trim() || !profTitle.value.trim() || !profPhone.value.trim() || !profRating.value.trim()) {
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
      currentProfile.rating = profRating.value.trim();
      currentProfile.avatar = profAvatar.value.trim();
      currentProfile.aboutImage = profAboutImg.value.trim();
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

      // Read Before/After info
      currentProfile.beforeAfter = {
        title: baTitle.value.trim(),
        description: baDesc.value.trim(),
        before: baImgBefore.value.trim(),
        after: baImgAfter.value.trim(),
        beforeLabel: baLabelBefore.value.trim(),
        afterLabel: baLabelAfter.value.trim()
      };

      // Read Gallery
      const galleryItems = galleryContainer.querySelectorAll(".admin-service-item");
      const updatedGallery = [];
      let galleryValidationError = false;
      galleryItems.forEach(item => {
        const title = item.querySelector(".gal-title-input").value.trim();
        const category = item.querySelector(".gal-cat-input").value.trim();
        const image = item.querySelector(".gal-image-input").value.trim();
        if (!title || !category || !image) {
          galleryValidationError = true;
        }
        updatedGallery.push({ title, category, image });
      });
      if (galleryValidationError) {
        showFeedback(false, "Lütfen portfolyo galerisindeki boş alanları doldurun.");
        return;
      }
      currentProfile.gallery = updatedGallery;

      // Read Testimonials
      const testimonialItems = testimonialsContainer.querySelectorAll(".admin-service-item");
      const updatedTestimonials = [];
      let testimonialValidationError = false;
      testimonialItems.forEach(item => {
        const name = item.querySelector(".testi-name-input").value.trim();
        const location = item.querySelector(".testi-loc-input").value.trim();
        const rating = parseInt(item.querySelector(".testi-rating-select").value);
        const date = item.querySelector(".testi-date-input").value.trim();
        const comment = item.querySelector(".testi-comment-input").value.trim();
        if (!name || !location || !comment || !date) {
          testimonialValidationError = true;
        }
        updatedTestimonials.push({ name, location, comment, rating, date });
      });
      if (testimonialValidationError) {
        showFeedback(false, "Lütfen müşteri yorumlarındaki boş alanları doldurun.");
        return;
      }
      currentProfile.testimonials = updatedTestimonials;

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
