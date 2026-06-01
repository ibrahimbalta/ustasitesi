/* ==========================================================================
   UstaBul JavaScript Controller
   Interactive Features, Calculator & Live Customization Panel
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  
  // State variables
  let currentSector = "seramik";
  let activeTemplate = USTA_TEMPLATES[currentSector];
  
  // --- DOM Elements Cache ---
  const body = document.body;
  const logoText = document.getElementById("logo-text-el");
  const logoIcon = document.getElementById("logo-icon-el");
  const metaTitle = document.getElementById("meta-title");
  const metaDesc = document.getElementById("meta-desc");
  
  // Nav & Header
  const navMenu = document.getElementById("nav-menu-el");
  const menuToggle = document.getElementById("menu-toggle-el");
  const callBtns = document.querySelectorAll(".call-btn-el");
  const whatsappBtns = document.querySelectorAll(".whatsapp-btn-el");
  const mailBtns = document.querySelectorAll(".mail-el");
  const phoneTexts = document.querySelectorAll(".phone-text-el");
  
  // Hero
  const heroTitle = document.getElementById("hero-title-el");
  const heroSubtitle = document.getElementById("hero-subtitle-el");
  const heroExperience = document.getElementById("hero-experience-el");
  const heroAvatar = document.getElementById("hero-avatar-el");
  const heroRatingVal = document.getElementById("hero-rating-val");
  
  // Stats
  const statExp = document.getElementById("stat-experience");
  const statProj = document.getElementById("stat-projects");
  const statCust = document.getElementById("stat-customers");
  const statRate = document.getElementById("stat-rating");
  
  // About
  const aboutText = document.getElementById("about-text-el");
  const aboutImg = document.getElementById("about-img-el");
  const aboutExp = document.getElementById("about-exp-num");
  const serviceAreasEl = document.getElementById("service-areas-el");
  
  // Services
  const servicesGrid = document.getElementById("services-grid-el");
  
  // Before / After
  const baSectionTitle = document.getElementById("ba-section-title");
  const baSectionDesc = document.getElementById("ba-section-desc");
  const baImgBefore = document.getElementById("ba-img-before");
  const baImgAfter = document.getElementById("ba-img-after");
  const baLabelBefore = document.getElementById("ba-label-before-text");
  const baLabelAfter = document.getElementById("ba-label-after-text");
  const baProjectTitle = document.getElementById("ba-project-title");
  const baProjectDesc = document.getElementById("ba-project-desc");
  
  // Gallery
  const galleryFilters = document.getElementById("gallery-filters-el");
  const galleryGrid = document.getElementById("gallery-grid-el");
  
  // Calculator
  const calcServiceSelect = document.getElementById("calc-service");
  const calcQuantityInput = document.getElementById("calc-quantity");
  const calcQtyLabel = document.getElementById("calc-qty-label");
  const calcUnitSpan = document.getElementById("calc-unit-span");
  const calcExtrasDiv = document.getElementById("calc-extras-el");
  const resServiceName = document.getElementById("res-service-name");
  const resUnitPrice = document.getElementById("res-unit-price");
  const resTotalPrice = document.getElementById("res-total-price");
  const calcWhatsappSend = document.getElementById("calc-whatsapp-send");
  
  // Testimonials & Contact Form
  const testimonialsGrid = document.getElementById("testimonials-grid-el");
  const contactServiceSelect = document.getElementById("contact-service-select");
  const footerYear = document.getElementById("footer-year");
  const footerName = document.getElementById("footer-name-el");
  
  // Demo Panel Elements
  const demoPanel = document.getElementById("demo-panel-el");
  const demoToggle = document.getElementById("demo-toggle-btn-el");
  const demoClose = document.getElementById("demo-close-btn");
  const demoTabs = document.querySelectorAll(".demo-tab-btn");
  const demoTabContents = document.querySelectorAll(".demo-tab-content");
  
  const editName = document.getElementById("edit-name");
  const editSurname = document.getElementById("edit-surname");
  const editSlogan = document.getElementById("edit-slogan");
  const editPhone = document.getElementById("edit-phone");
  const editWhatsapp = document.getElementById("edit-whatsapp");
  const editFont = document.getElementById("edit-font");
  const editColorPicker = document.getElementById("edit-color-picker");
  const themeDarkBtn = document.getElementById("theme-dark-btn");
  const themeLightBtn = document.getElementById("theme-light-btn");
  const colorSwatches = document.querySelectorAll(".color-swatch-btn");
  const sectorRadios = document.querySelectorAll('input[name="sector-select"]');

  // Set footer current year
  if (footerYear) footerYear.textContent = new Date().getFullYear();

  // ==========================================================================
  // 1. DYNAMIC TEMPLATE RENDER FUNCTION
  // ==========================================================================
  function renderTemplate(template) {
    activeTemplate = template;
    
    // Page metadata
    metaTitle.textContent = `${template.name} ${template.surname} | ${template.title}`;
    metaDesc.setAttribute("content", `${template.experience} yıllık deneyimli ${template.title.toLowerCase()}. ${template.slogan}. Kaliteli işçilik ve uygun fiyat. Arayın!`);
    
    // Logo & Header
    logoText.textContent = `${template.name} ${template.surname}`;
    footerName.textContent = `${template.name} ${template.surname}`;
    
    // Set Header Icon based on sector
    if (template.id === "seramik") logoIcon.className = "fa-solid fa-bath logo-icon";
    else if (template.id === "insaat") logoIcon.className = "fa-solid fa-trowel-bricks logo-icon";
    else if (template.id === "boya") logoIcon.className = "fa-solid fa-paint-roller logo-icon";
    else if (template.id === "elektrik") logoIcon.className = "fa-solid fa-bolt logo-icon";
    else if (template.id === "tesisat") logoIcon.className = "fa-solid fa-wrench logo-icon";
    
    // Update Contacts
    updateContactLinks(template.phone, template.whatsapp, template.email);
    
    // Hero
    heroTitle.textContent = template.slogan;
    heroSubtitle.textContent = template.about.substring(0, 160) + "...";
    heroExperience.textContent = template.experience;
    heroRatingVal.textContent = template.rating;
    
    // Avatar Images mapping based on sector
    heroAvatar.src = `assets/${template.id}-avatar.jpg`;
    aboutImg.src = `assets/${template.id}-about.jpg`;
    
    // Stats
    statExp.textContent = `${template.experience}+`;
    statProj.textContent = template.projects;
    statRate.textContent = `${template.rating} / 5`;
    
    // About
    aboutText.textContent = template.about;
    aboutExp.textContent = template.experience;
    
    // Services rendering
    renderServices(template.services);
    
    // Before / After Rendering
    baImgBefore.src = template.beforeAfter.before;
    baImgAfter.src = template.beforeAfter.after;
    baLabelBefore.textContent = template.beforeAfter.beforeLabel;
    baLabelAfter.textContent = template.beforeAfter.afterLabel;
    baProjectTitle.textContent = template.beforeAfter.title;
    baProjectDesc.textContent = template.beforeAfter.description;
    
    // Gallery Rendering
    renderGallery(template.gallery);
    
    // Pricing Calculator Rendering
    setupCalculator(template.pricing, template.services);
    
    // Testimonials Rendering
    renderTestimonials(template.testimonials, template.name);
    
    // Sync Demo Inputs with active template values
    syncDemoFormWithTemplate(template);
    
    // Trigger color application
    applyThemeColor(template.themeColor);
  }

  // Update Contacts
  function updateContactLinks(phone, whatsapp, email) {
    const formattedPhone = phone.replace(/\s+/g, '');
    callBtns.forEach(btn => {
      btn.href = `tel:${formattedPhone}`;
    });
    
    phoneTexts.forEach(txt => {
      txt.textContent = phone;
    });

    whatsappBtns.forEach(btn => {
      btn.href = `https://wa.me/${whatsapp}`;
    });

    mailBtns.forEach(btn => {
      btn.href = `mailto:${email}`;
      if (btn.id === "email-text-el") btn.textContent = email;
    });
  }

  // Render Services Grid
  function renderServices(services) {
    servicesGrid.innerHTML = "";
    contactServiceSelect.innerHTML = "";
    
    services.forEach(srv => {
      // Services Card
      const card = document.createElement("div");
      card.className = "service-card";
      
      let iconHtml = `<i class="fa-solid fa-wrench"></i>`;
      if (srv.icon) {
        iconHtml = `<i class="fa-solid ${srv.icon}"></i>`;
      }
      
      card.innerHTML = `
        <div class="service-icon-box">
          ${iconHtml}
        </div>
        <h3>${srv.title}</h3>
        <p>${srv.description}</p>
      `;
      servicesGrid.appendChild(card);
      
      // Also add to Contact Form select
      const opt = document.createElement("option");
      opt.value = srv.title;
      opt.textContent = srv.title;
      contactServiceSelect.appendChild(opt);
    });
  }

  // Render Gallery Items
  function renderGallery(gallery) {
    galleryGrid.innerHTML = "";
    
    // Fetch unique categories for filters
    const categories = ["all", ...new Set(gallery.map(item => item.category))];
    
    // Render Filters
    galleryFilters.innerHTML = "";
    categories.forEach(cat => {
      const btn = document.createElement("button");
      btn.className = cat === "all" ? "filter-btn active" : "filter-btn";
      btn.setAttribute("data-filter", cat);
      btn.textContent = cat === "all" ? "Tümü" : cat;
      galleryFilters.appendChild(btn);
      
      btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        filterGalleryItems(cat);
      });
    });

    // Render Items
    gallery.forEach(item => {
      const col = document.createElement("div");
      col.className = "gallery-item";
      col.setAttribute("data-category", item.category);
      
      col.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <div class="gallery-overlay">
          <span>${item.category}</span>
          <h4>${item.title}</h4>
        </div>
      `;
      
      col.addEventListener("click", () => openLightbox(item.image, `${item.category} - ${item.title}`));
      galleryGrid.appendChild(col);
    });
  }

  // Filter gallery items
  function filterGalleryItems(category) {
    const items = galleryGrid.querySelectorAll(".gallery-item");
    items.forEach(item => {
      if (category === "all" || item.getAttribute("data-category") === category) {
        item.style.display = "block";
        setTimeout(() => item.style.opacity = "1", 50);
      } else {
        item.style.opacity = "0";
        setTimeout(() => item.style.display = "none", 300);
      }
    });
  }

  // Render Testimonials Grid
  function renderTestimonials(testimonials, masterName) {
    testimonialsGrid.innerHTML = "";
    testimonials.forEach(t => {
      const card = document.createElement("div");
      card.className = "testimonial-card";
      
      let starsHtml = "";
      for (let i = 0; i < 5; i++) {
        starsHtml += i < t.rating ? `<i class="fa-solid fa-star"></i>` : `<i class="fa-regular fa-star"></i>`;
      }
      
      // Get initials for profile badge
      const initials = t.name.split(" ").map(w => w[0]).join("").toUpperCase();
      
      card.innerHTML = `
        <div>
          <div class="stars">${starsHtml}</div>
          <p class="testimonial-comment">${t.comment}</p>
        </div>
        <div class="client-info">
          <div class="client-avatar-box">${initials}</div>
          <div class="client-meta">
            <h4>${t.name}</h4>
            <p>${t.location} • ${t.date}</p>
          </div>
        </div>
      `;
      testimonialsGrid.appendChild(card);
    });
  }

  // ==========================================================================
  // 2. INTERACTIVE PRICING CALCULATOR
  // ==========================================================================
  function setupCalculator(pricing, services) {
    calcServiceSelect.innerHTML = "";
    calcExtrasDiv.innerHTML = "";
    
    // Label updates
    calcQtyLabel.textContent = `Yaklaşık Hacim / Metraj (${pricing.unitName})`;
    calcUnitSpan.textContent = pricing.unitName.includes("m²") ? "m²" : "Adet";
    
    // Populate service dropdown
    services.forEach(srv => {
      const opt = document.createElement("option");
      opt.value = srv.title;
      opt.textContent = srv.title;
      calcServiceSelect.appendChild(opt);
    });

    // Populate extras checkboxes
    pricing.options.forEach((opt, idx) => {
      const label = document.createElement("label");
      label.className = "checkbox-label";
      label.innerHTML = `
        <input type="checkbox" class="calc-extra-chk" value="${opt.price}" data-name="${opt.name}">
        <span>${opt.name} (+${opt.price} TL)</span>
      `;
      calcExtrasDiv.appendChild(label);
      
      // Recalculate on checkbox click
      label.querySelector("input").addEventListener("change", calculateTotal);
    });

    // Event listeners
    calcServiceSelect.addEventListener("change", calculateTotal);
    calcQuantityInput.addEventListener("input", calculateTotal);
    
    // Initial calculate
    calculateTotal();
  }

  function calculateTotal() {
    const selectedServiceName = calcServiceSelect.value;
    const baseRate = activeTemplate.pricing.basePrice;
    const quantity = parseFloat(calcQuantityInput.value) || 0;
    
    let baseTotal = baseRate * quantity;
    
    // Collect extras
    let extrasTotal = 0;
    const checkedExtras = [];
    
    const checkboxes = calcExtrasDiv.querySelectorAll(".calc-extra-chk:checked");
    checkboxes.forEach(chk => {
      const price = parseFloat(chk.value);
      extrasTotal += price * (activeTemplate.pricing.unitName.includes("m²") ? quantity : 1);
      checkedExtras.push(chk.getAttribute("data-name"));
    });
    
    const grandTotal = baseTotal + extrasTotal;
    
    // Update result card UI
    resServiceName.textContent = selectedServiceName;
    resUnitPrice.textContent = `${baseRate} TL / birim`;
    resTotalPrice.textContent = `${grandTotal.toLocaleString("tr-TR")} TL`;
    
    // WhatsApp Send text building
    setupWhatsAppSendLink(selectedServiceName, quantity, checkedExtras, grandTotal);
  }

  function setupWhatsAppSendLink(service, qty, extras, total) {
    const unit = activeTemplate.pricing.unitName.includes("m²") ? "m²" : "Adet";
    let message = `Merhaba *${activeTemplate.name} Usta*,\n\nWeb sitenizdeki fiyat hesaplama aracı üzerinden bir fiyat teklifi hazırladım. Detaylar aşağıdaki gibidir:\n\n`;
    message += `🛠️ *Hizmet:* ${service}\n`;
    message += `📐 *Miktar:* ${qty} ${unit}\n`;
    
    if (extras.length > 0) {
      message += `➕ *Ek Seçenekler:*\n`;
      extras.forEach(ext => {
        message += `   - ${ext}\n`;
      });
    }
    
    message += `\n💰 *Tahmini Tahmin Tutar:* ~${total.toLocaleString("tr-TR")} TL~\n\n`;
    message += `Bu iş için yerinde ücretsiz keşif yapıp kesin bir fiyat çıkartabilir miyiz? Dönüşünüzü bekliyorum.`;
    
    const encodedMessage = encodeURIComponent(message);
    calcWhatsappSend.addEventListener("click", () => {
      window.open(`https://wa.me/${activeTemplate.whatsapp}?text=${encodedMessage}`, "_blank");
    });
  }

  // ==========================================================================
  // 3. INTERACTIVE BEFORE / AFTER SLIDER
  // ==========================================================================
  const baSlider = document.getElementById("ba-slider-el");
  const baAfterContainer = document.getElementById("ba-after-container-el");
  const baHandle = document.getElementById("ba-handle-el");
  
  if (baSlider && baAfterContainer && baHandle) {
    let isDragging = false;

    // Responsive adaptation helper: sync child image widths with slider parent
    function syncAfterImageWidth() {
      const sliderWidth = baSlider.offsetWidth;
      const afterImg = baImgAfter;
      if (afterImg) {
        afterImg.style.width = `${sliderWidth}px`;
      }
    }

    window.addEventListener("resize", syncAfterImageWidth);
    
    // Setup slider interactions
    baHandle.addEventListener("mousedown", (e) => {
      isDragging = true;
      e.preventDefault();
    });

    window.addEventListener("mouseup", () => {
      isDragging = false;
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      moveSlider(e.pageX);
    });

    // Touch events for mobile
    baHandle.addEventListener("touchstart", (e) => {
      isDragging = true;
    });

    window.addEventListener("touchend", () => {
      isDragging = false;
    });

    window.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      moveSlider(e.touches[0].pageX);
    });

    function moveSlider(pageX) {
      const sliderRect = baSlider.getBoundingClientRect();
      const sliderWidth = sliderRect.width;
      
      let x = pageX - sliderRect.left;
      
      // Constrain inside bounds
      if (x < 0) x = 0;
      if (x > sliderWidth) x = sliderWidth;
      
      // Calculate percentage
      const percent = (x / sliderWidth) * 100;
      
      // Update sizes and left offset
      baAfterContainer.style.width = `${percent}%`;
      baHandle.style.left = `${percent}%`;
    }
  }

  // ==========================================================================
  // 4. PORTFOLIO LIGHTBOX MODAL
  // ==========================================================================
  const lightbox = document.getElementById("lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption-el");
  const lightboxCloseBtn = document.getElementById("lightbox-close-btn");

  function openLightbox(src, caption) {
    if (!lightbox) return;
    lightboxImg.src = src;
    lightboxCaption.textContent = caption;
    lightbox.classList.add("active");
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("active");
  }

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // ==========================================================================
  // 5. MOBILE MENU INTERACTION
  // ==========================================================================
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close menu when links clicked
    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navMenu.classList.remove("active");
        
        // Active visual highlight
        document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
        link.classList.add("active");
      });
    });
  }

  // ==========================================================================
  // 6. DEVELOPER DEMO PANEL ACTIONS
  // ==========================================================================
  
  // Slide panel toggle
  if (demoToggle && demoPanel) {
    demoToggle.addEventListener("click", () => {
      demoPanel.classList.toggle("active");
    });
  }
  
  if (demoClose && demoPanel) {
    demoClose.addEventListener("click", () => {
      demoPanel.classList.remove("active");
    });
  }

  // Dev tab switches
  demoTabs.forEach(btn => {
    btn.addEventListener("click", () => {
      demoTabs.forEach(b => b.classList.remove("active"));
      demoTabContents.forEach(tc => tc.classList.remove("active"));
      
      btn.classList.add("active");
      const targetTab = btn.getAttribute("data-tab");
      document.getElementById(targetTab).classList.add("active");
    });
  });

  // Sync editor inputs with loaded template values
  function syncDemoFormWithTemplate(template) {
    editName.value = template.name;
    editSurname.value = template.surname;
    editSlogan.value = template.slogan;
    editPhone.value = template.phone;
    editWhatsapp.value = template.whatsapp;
    
    // Select correct radio button
    const radio = document.querySelector(`input[name="sector-select"][value="${template.id}"]`);
    if (radio) radio.checked = true;
    
    // Color picker
    editColorPicker.value = template.themeColor;
    
    // Swatch highlighted active border
    colorSwatches.forEach(sw => {
      if (sw.getAttribute("data-color").toLowerCase() === template.themeColor.toLowerCase()) {
        sw.classList.add("active");
      } else {
        sw.classList.remove("active");
      }
    });
  }

  // A. Change sector template
  sectorRadios.forEach(radio => {
    radio.addEventListener("change", (e) => {
      if (e.target.checked) {
        currentSector = e.target.value;
        const newTemplate = USTA_TEMPLATES[currentSector];
        renderTemplate(newTemplate);
        
        // After rendering template, adjust image sizes of slider
        setTimeout(syncAfterImageWidth, 100);
      }
    });
  });

  // B. Live update Name & Surname
  function handleNameUpdate() {
    const name = editName.value.trim() || activeTemplate.name;
    const surname = editSurname.value.trim() || activeTemplate.surname;
    
    // Update header & footer
    logoText.textContent = `${name} ${surname}`;
    footerName.textContent = `${name} ${surname}`;
    
    // Update meta details
    metaTitle.textContent = `${name} ${surname} | ${activeTemplate.title}`;
    
    // Update before-after slider name label
    baLabelAfter.textContent = `${name} Usta Dokunuşu`;
    
    // Update calculation text variables
    calculateTotal();
  }

  editName.addEventListener("input", handleNameUpdate);
  editSurname.addEventListener("input", handleNameUpdate);

  // C. Live update Slogan
  editSlogan.addEventListener("input", () => {
    const sloganVal = editSlogan.value.trim() || activeTemplate.slogan;
    heroTitle.textContent = sloganVal;
  });

  // D. Live update phone & whatsapp links
  editPhone.addEventListener("input", () => {
    const phoneVal = editPhone.value.trim() || activeTemplate.phone;
    updateContactLinks(phoneVal, editWhatsapp.value.trim(), activeTemplate.email);
  });
  
  editWhatsapp.addEventListener("input", () => {
    const waVal = editWhatsapp.value.trim() || activeTemplate.whatsapp;
    updateContactLinks(editPhone.value.trim(), waVal, activeTemplate.email);
  });

  // E. Dynamic theme colors
  function applyThemeColor(hex) {
    // Set variables
    document.documentElement.style.setProperty("--primary-color", hex);
    
    // Calculate Hover color (darker)
    const hoverColor = adjustHexBrightness(hex, -20);
    document.documentElement.style.setProperty("--primary-color-hover", hoverColor);
    
    // Calculate RGB values for shadow glows
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

  // Handle color swatch clicks
  colorSwatches.forEach(sw => {
    sw.addEventListener("click", () => {
      colorSwatches.forEach(s => s.classList.remove("active"));
      sw.classList.add("active");
      
      const col = sw.getAttribute("data-color");
      editColorPicker.value = col;
      applyThemeColor(col);
    });
  });

  // Handle color picker input
  editColorPicker.addEventListener("input", (e) => {
    colorSwatches.forEach(s => s.classList.remove("active"));
    applyThemeColor(e.target.value);
  });

  // F. Typography selections
  editFont.addEventListener("change", (e) => {
    document.documentElement.style.setProperty("--font-primary", e.target.value);
  });

  // G. Interface themes (Light/Dark mode)
  if (themeDarkBtn && themeLightBtn) {
    themeDarkBtn.addEventListener("click", () => {
      themeLightBtn.classList.remove("active");
      themeDarkBtn.classList.add("active");
      body.className = "dark-theme";
    });
    
    themeLightBtn.addEventListener("click", () => {
      themeDarkBtn.classList.remove("active");
      themeLightBtn.classList.add("active");
      body.className = "light-theme";
    });
  }

  // ==========================================================================
  // 7. BOOTSTRAP INITIALIZATION
  // ==========================================================================
  
  // Check if the admin panel has saved a custom profile in localStorage
  const savedProfile = localStorage.getItem("usta_custom_profile");
  
  if (savedProfile) {
    // Admin panel verileri varsa, onları yükle
    try {
      const customProfile = JSON.parse(savedProfile);
      
      // Merge custom profile onto a base template so missing fields (gallery, beforeAfter, testimonials, etc.) are filled
      const baseTemplate = USTA_TEMPLATES[customProfile.id] || USTA_TEMPLATES.seramik;
      const mergedTemplate = Object.assign({}, baseTemplate, customProfile);
      
      // Ensure nested objects are properly merged
      if (customProfile.pricing) {
        mergedTemplate.pricing = Object.assign({}, baseTemplate.pricing, customProfile.pricing);
        if (customProfile.pricing.options) {
          mergedTemplate.pricing.options = customProfile.pricing.options;
        }
      }
      if (customProfile.services) {
        mergedTemplate.services = customProfile.services;
      }
      if (!mergedTemplate.beforeAfter) {
        mergedTemplate.beforeAfter = baseTemplate.beforeAfter;
      }
      if (!mergedTemplate.gallery) {
        mergedTemplate.gallery = baseTemplate.gallery;
      }
      if (!mergedTemplate.testimonials) {
        mergedTemplate.testimonials = baseTemplate.testimonials;
      }
      
      renderTemplate(mergedTemplate);
    } catch (e) {
      // JSON parse hatası varsa varsayılana dön
      renderTemplate(USTA_TEMPLATES.seramik);
    }
  } else {
    // Varsayılan şablon
    renderTemplate(USTA_TEMPLATES.seramik);
  }
  
  // Set up initial positions for images
  setTimeout(() => {
    syncAfterImageWidth();
  }, 300);

});

