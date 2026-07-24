// Import stylesheet
import './style.css';

// Import Swiper bundle
import Swiper from 'swiper/bundle';

// Import jsVectorMap
import jsVectorMap from 'jsvectormap';
import 'jsvectormap/dist/jsvectormap.min.css';
import 'jsvectormap/dist/maps/world.js';

// Import News Plugin
import { initNews } from './news-plugin.js';

// Import i18n Translations
import { translations, phraseMap } from './i18n.js';

// Import Global Search
import { initGlobalSearch } from './search-modal.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Global Header Product Search
  initGlobalSearch();

  // Initialize News Plugin
  initNews();
  
  // --- Header Scroll Effect (Hardware Accelerated 120 FPS) ---
  const mainHeader = document.getElementById('mainHeader');
  const scrollIndicator = document.getElementById('scrollIndicator');
  if (mainHeader) {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        mainHeader.classList.add('scrolled');
      } else {
        mainHeader.classList.remove('scrolled');
      }

      if (scrollIndicator) {
        if (window.scrollY > 80) {
          scrollIndicator.style.opacity = '0';
          scrollIndicator.style.pointerEvents = 'none';
        } else {
          scrollIndicator.style.opacity = '1';
          scrollIndicator.style.pointerEvents = 'auto';
        }
      }
    };
    handleScroll();
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // --- Corporate Video Modal Handlers ---
  const openVideoModalBtn = document.getElementById('openVideoModalBtn');
  const closeVideoModalBtn = document.getElementById('closeVideoModalBtn');
  const videoModal = document.getElementById('videoModal');
  const videoModalOverlay = document.getElementById('videoModalOverlay');
  const corporateVideoPlayer = document.getElementById('corporateVideoPlayer');

  if (openVideoModalBtn && videoModal) {
    openVideoModalBtn.addEventListener('click', () => {
      videoModal.classList.remove('hidden');
      void videoModal.offsetWidth;
      videoModal.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (corporateVideoPlayer) {
        corporateVideoPlayer.currentTime = 0;
        corporateVideoPlayer.play().catch(() => {});
      }
    });

    const closeVideo = () => {
      videoModal.classList.remove('open');
      if (corporateVideoPlayer) corporateVideoPlayer.pause();
      setTimeout(() => {
        videoModal.classList.add('hidden');
        document.body.style.overflow = '';
      }, 300);
    };

    if (closeVideoModalBtn) closeVideoModalBtn.addEventListener('click', closeVideo);
    if (videoModalOverlay) videoModalOverlay.addEventListener('click', closeVideo);
  }

  // --- Mobile Menu Toggle ---
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeMobileMenuBtn = document.getElementById('closeMobileMenuBtn');
  const mobileMenuPanel = document.getElementById('mobileMenuPanel');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

  const openMobileMenu = () => {
    mobileMenuPanel.classList.remove('translate-x-full');
  };

  const closeMobileMenu = () => {
    mobileMenuPanel.classList.add('translate-x-full');
  };

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
  if (closeMobileMenuBtn) closeMobileMenuBtn.addEventListener('click', closeMobileMenu);
  if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMobileMenu);

  // --- Mobile Brands Submenu Accordion ---
  const mobileBrandsToggle = document.getElementById('mobileBrandsToggle');
  const mobileBrandsSubmenu = document.getElementById('mobileBrandsSubmenu');
  const mobileBrandsArrow = document.getElementById('mobileBrandsArrow');

  if (mobileBrandsToggle) {
    mobileBrandsToggle.addEventListener('click', () => {
      mobileBrandsSubmenu.classList.toggle('hidden');
      mobileBrandsArrow.classList.toggle('rotate-180');
    });
  }

  // --- Mobile Services Submenu Accordion ---
  const mobileServicesToggle = document.getElementById('mobileServicesToggle');
  const mobileServicesSubmenu = document.getElementById('mobileServicesSubmenu');
  const mobileServicesArrow = document.getElementById('mobileServicesArrow');

  if (mobileServicesToggle) {
    mobileServicesToggle.addEventListener('click', () => {
      mobileServicesSubmenu.classList.toggle('hidden');
      mobileServicesArrow.classList.toggle('rotate-180');
    });
  }

  // --- Cookie Consent ---
  const acceptCookiesBtn = document.getElementById('acceptCookiesBtn');
  const cookieBanner = document.getElementById('cookieBanner');

  // Check local storage
  if (localStorage.getItem('boni_cookies_accepted') === 'true') {
    if (cookieBanner) cookieBanner.remove();
  }

  if (acceptCookiesBtn) {
    acceptCookiesBtn.addEventListener('click', () => {
      localStorage.setItem('boni_cookies_accepted', 'true');
      if (cookieBanner) {
        cookieBanner.classList.add('animate__fadeOutLeft');
        setTimeout(() => cookieBanner.remove(), 500);
      }
    });
  }

  // --- Swiper Sliders Initialization ---

  // 1. Hero Main Slider
  if (document.querySelector('.mainHeroSlider')) {
    const heroSlider = new Swiper('.mainHeroSlider', {
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.slider-button-next',
        prevEl: '.slider-button-prev',
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      on: {
        slideChangeTransitionStart: function () {
          // Simple slide content animations trigger
          const activeSlide = this.slides[this.activeIndex];
          const animContent = activeSlide.querySelector('.animate__animated');
          if (animContent) {
            animContent.classList.remove('animate__fadeInUp');
            void animContent.offsetWidth; // Trigger reflow
            animContent.classList.add('animate__fadeInUp');
          }
        }
      }
    });
  }

  // 2. Brands Slider (Carousel)
  if (document.querySelector('.brandsSlider')) {
    const brandsSlider = new Swiper('.brandsSlider', {
      loop: true,
      spaceBetween: 20,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.brands-button-next',
        prevEl: '.brands-button-prev',
      },
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 10
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 15
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 20
        },
        1024: {
          slidesPerView: 6,
          spaceBetween: 24
        }
      }
    });
  }



  // --- Contact Modal Control ---
  const openContactModalBtn = document.getElementById('openContactModalBtn');
  const closeContactModalBtn = document.getElementById('closeContactModalBtn');
  const contactModal = document.getElementById('contactModal');
  const contactModalOverlay = document.getElementById('contactModalOverlay');
  const contactModalCard = document.getElementById('contactModalCard');

  const openModal = () => {
    contactModal.classList.remove('hidden');
    void contactModal.offsetWidth; // Trigger reflow
    contactModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    contactModal.classList.remove('open');
    setTimeout(() => {
      contactModal.classList.add('hidden');
      document.body.style.overflow = '';
    }, 300);
  };

  if (openContactModalBtn) openContactModalBtn.addEventListener('click', openModal);
  if (closeContactModalBtn) closeContactModalBtn.addEventListener('click', closeModal);
  if (contactModalOverlay) contactModalOverlay.addEventListener('click', closeModal);


  // --- B2B Modal Trigger Helper ---
  const openB2BModal = () => {
    openModal();
    if (tabKurumsal) tabKurumsal.click();
  };

  const b2bButtons = ['heroB2BBtn', 'b2bDistributorBtn', 'b2bCapacityBtn', 'floatingB2BWidget', 'aboutB2BBtn', 'aboutMapBtn'];
  b2bButtons.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', openB2BModal);
  });

  // --- Modal Tabs Switch ---
  const tabBireysel = document.getElementById('tabBireysel');
  const tabKurumsal = document.getElementById('tabKurumsal');
  const tabSlider = document.getElementById('tabSlider');
  const formTypeInput = document.getElementById('formTypeInput');

  // Fields
  const fieldCompany = document.getElementById('fieldCompany');
  const fieldCorporateGroup = document.getElementById('fieldCorporateGroup');
  const fieldSubject = document.getElementById('fieldSubject');
  const labelName = document.getElementById('labelName');

  const inputCompany = document.querySelector('input[name="company"]');
  const inputSector = document.querySelector('input[name="sector"]');
  const inputSubject = document.querySelector('input[name="subject"]');

  if (tabBireysel && tabKurumsal) {
    tabBireysel.addEventListener('click', () => {
      tabSlider.style.transform = 'translateX(0)';
      tabBireysel.classList.add('text-siyah');
      tabBireysel.classList.remove('text-gray-400');
      tabKurumsal.classList.add('text-gray-400');
      tabKurumsal.classList.remove('text-siyah');
      
      formTypeInput.value = 'bireysel';
      labelName.textContent = 'Adınız Soyadınız *';
      
      fieldCompany.classList.add('hidden');
      fieldCorporateGroup.classList.remove('grid');
      fieldCorporateGroup.classList.add('hidden');
      fieldSubject.classList.remove('hidden');

      if (inputCompany) inputCompany.required = false;
      if (inputSector) inputSector.required = false;
      if (inputSubject) inputSubject.required = true;
    });

    tabKurumsal.addEventListener('click', () => {
      tabSlider.style.transform = 'translateX(100%)';
      tabKurumsal.classList.add('text-siyah');
      tabKurumsal.classList.remove('text-gray-400');
      tabBireysel.classList.add('text-gray-400');
      tabBireysel.classList.remove('text-siyah');
      
      formTypeInput.value = 'kurumsal';
      labelName.textContent = 'Yetkili Adı Soyadı *';
      
      fieldCompany.classList.remove('hidden');
      fieldCorporateGroup.classList.remove('hidden');
      fieldCorporateGroup.classList.add('grid');
      fieldSubject.classList.add('hidden');

      if (inputCompany) inputCompany.required = true;
      if (inputSector) inputSector.required = true;
      if (inputSubject) inputSubject.required = false;
    });
  }

  // --- Form Submission & Success Toast ---
  const dualContactForm = document.getElementById('dualContactForm');
  if (dualContactForm) {
    dualContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = dualContactForm.querySelector('button[type="submit"]');
      const submitBtnText = submitBtn.querySelector('span');
      const submitIcon = document.getElementById('submitIcon');
      
      const originalText = submitBtnText.textContent;
      submitBtnText.textContent = 'Gönderiliyor...';
      submitIcon.className = 'las la-spinner animate-spin ml-2 text-sm';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtnText.textContent = originalText;
        submitIcon.className = 'las la-paper-plane ml-2 text-sm';
        submitBtn.disabled = false;

        dualContactForm.reset();
        closeModal();

        showSuccessToast(formTypeInput.value === 'kurumsal' ? 'Kurumsal teklif talebiniz başarıyla iletildi!' : 'Mesajınız başarıyla iletildi!');
      }, 1500);
    });
  }

  function showSuccessToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-24 right-6 bg-emerald-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-3 z-50 animate__animated animate__fadeInUp border border-emerald-400/30';
    toast.style.backdropFilter = 'blur(8px)';
    
    toast.innerHTML = `
      <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
        <i class="las la-check text-white text-base"></i>
      </div>
      <span class="text-xs font-bold uppercase tracking-wider">${message}</span>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('animate__fadeOutDown');
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }

  // --- Stats Counter Animation ---
  const stats = document.querySelectorAll('.stat-number');
  const countUp = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1500; // 1.5 seconds animation
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function outQuad
      const easedProgress = progress * (2 - progress);
      const currentValue = Math.floor(easedProgress * target);
      
      // Add formatting for 15,000 (thousand separator)
      if (target >= 1000) {
        el.textContent = currentValue.toLocaleString('tr-TR');
      } else {
        el.textContent = currentValue;
      }

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        el.textContent = target >= 1000 ? target.toLocaleString('tr-TR') : target;
      }
    };

    requestAnimationFrame(updateCount);
  };

  const statsObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        stats.forEach(stat => countUp(stat));
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  const rakamlarlaBoniSec = document.getElementById('rakamlarlaBoni');
  if (rakamlarlaBoniSec) statsObserver.observe(rakamlarlaBoniSec);

  // --- jsVectorMap Initialization ---
  const mapElement = document.getElementById('worldMap');
  if (mapElement) {
    new jsVectorMap({
      selector: '#worldMap',
      map: 'world',
      backgroundColor: 'transparent',
      draggable: true,
      zoomButtons: false,
      zoomOnScroll: false,
      focusOn: {
        regions: ['TR', 'DE', 'IQ', 'LY', 'MA', 'AZ', 'UZ', 'GE', 'TN'],
        animate: false
      },
      regionStyle: {
        initial: {
          fill: '#f1f5f9',
          stroke: '#cbd5e1',
          strokeWidth: 0.8,
          fillOpacity: 1
        },
        hover: {
          fill: '#007e4d',
          fillOpacity: 0.8
        }
      },
      markerStyle: {
        initial: {
          image: '/favicon.png'
        }
      },
      markers: [
        { name: "Türkiye (Merkez)", coords: [38.9637, 35.2433] },
        { name: "Almanya", coords: [51.1657, 10.4515] },
        { name: "Irak", coords: [33.3128, 44.3615] },
        { name: "Libya", coords: [26.3351, 17.2283] },
        { name: "Fas", coords: [31.7917, -7.0926] },
        { name: "Azerbaycan", coords: [40.1431, 47.5769] },
        { name: "Özbekistan", coords: [41.3775, 64.5853] },
        { name: "Gürcistan", coords: [42.3154, 43.3569] },
        { name: "Tunus", coords: [33.8869, 9.5375] }
      ]
    });
  }

  // --- PDF Brochure Cover Renderer ---
  const renderPdfThumbnails = () => {
    const thumbnails = document.querySelectorAll('.pdf-thumbnail');
    if (thumbnails.length === 0) return;

    // Load PDF.js library dynamically if it isn't already loaded
    const loadPdfJs = () => {
      return new Promise((resolve, reject) => {
        if (window.pdfjsLib) {
          resolve(window.pdfjsLib);
          return;
        }
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js';
        script.onload = () => {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
          resolve(window.pdfjsLib);
        };
        script.onerror = () => reject(new Error('PDF.js failed to load'));
        document.head.appendChild(script);
      });
    };

    loadPdfJs().then((pdfjs) => {
      thumbnails.forEach(container => {
        const pdfUrl = container.getAttribute('data-pdf');
        const canvas = container.querySelector('canvas');
        const spinner = container.querySelector('.pdf-loading');
        if (!pdfUrl || !canvas) return;

        // Load document
        pdfjs.getDocument(pdfUrl).promise.then(pdf => {
          // Get page 1
          return pdf.getPage(1);
        }).then(page => {
          // Set optimal resolution (e.g. 1.5x scale)
          const scale = 1.5;
          const viewport = page.getViewport({ scale });
          
          // Match canvas size to container proportions
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          const context = canvas.getContext('2d');
          const renderContext = {
            canvasContext: context,
            viewport: viewport
          };

          return page.render(renderContext).promise;
        }).then(() => {
          // Success: fade in canvas, remove spinner
          canvas.classList.remove('opacity-0');
          canvas.classList.add('opacity-100');
          if (spinner) {
            spinner.classList.add('animate__animated', 'animate__fadeOut');
            setTimeout(() => spinner.remove(), 500);
          }
        }).catch(err => {
          console.error('Error rendering PDF thumbnail:', err);
          // Show fallback thumbnail icon
          if (spinner) {
            spinner.innerHTML = '<i class="las la-file-pdf text-[#d63384] text-4xl animate__pulse"></i>';
          }
        });
      });
    }).catch(err => {
      console.error(err);
    });
  };

  renderPdfThumbnails();

  // --- Card Scroll Animations (IntersectionObserver) ---
  const animateCards = () => {
    const cards = document.querySelectorAll('.scroll-animate-card');
    if (cards.length === 0) return;

    const observerOptions = {
      root: null,
      threshold: 0.05,
      rootMargin: '-30px 0px -30px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const card = entry.target;
        const rect = card.getBoundingClientRect();
        const isAbove = rect.top < 0;

        if (entry.isIntersecting) {
          card.classList.remove('opacity-0', 'translate-y-16', '-translate-y-16', 'scale-95');
          card.classList.add('opacity-100', 'translate-y-0', 'scale-100');
        } else {
          card.classList.remove('opacity-100', 'translate-y-0', 'scale-100');
          card.classList.add('opacity-0', 'scale-95');

          if (isAbove) {
            card.classList.remove('translate-y-16');
            card.classList.add('-translate-y-16');
          } else {
            card.classList.remove('-translate-y-16');
            card.classList.add('translate-y-16');
          }
        }
      });
    }, observerOptions);

    cards.forEach((card, index) => {
      const delay = (index % 3) * 100;
      card.style.transitionDelay = `${delay}ms`;
      observer.observe(card);
    });
  };

  animateCards();

  // --- Native Multi-Language Translation System & URL Router ---
  const initNativeTranslator = () => {
    const supportedLangs = ['tr', 'en', 'fr', 'es', 'eu', 'ru', 'ar'];
    const languagesObj = [
      { code: 'tr', name: 'TR', flag: 'https://flagcdn.com/w20/tr.png' },
      { code: 'en', name: 'EN', flag: 'https://flagcdn.com/w20/gb.png' },
      { code: 'fr', name: 'FR', flag: 'https://flagcdn.com/w20/fr.png' },
      { code: 'es', name: 'ES', flag: 'https://flagcdn.com/w20/es.png' },
      { code: 'eu', name: 'EU', flag: 'https://flagcdn.com/w20/eu.png' },
      { code: 'ru', name: 'RU', flag: 'https://flagcdn.com/w20/ru.png' },
      { code: 'ar', name: 'AR', flag: 'https://flagcdn.com/w20/sa.png' }
    ];

    const getLangFromUrl = () => {
      const pathSegments = window.location.pathname.split('/').filter(Boolean);
      if (pathSegments.length > 0 && supportedLangs.includes(pathSegments[0].toLowerCase())) {
        return pathSegments[0].toLowerCase();
      }
      const saved = localStorage.getItem('boni_selected_lang');
      return supportedLangs.includes(saved) ? saved : 'tr';
    };

    let currentLang = getLangFromUrl();

    const applyTranslations = (lang) => {
      currentLang = lang;

      // 1. HTML Dir & Lang
      document.documentElement.lang = lang;
      if (lang === 'ar') {
        document.documentElement.dir = 'rtl';
      } else {
        document.documentElement.dir = 'ltr';
      }

      // 2. Nav Links handled automatically by walkAndTranslate below.

      // 3. Contact Us Button & Header Top Links
      const contactUsBtn = document.getElementById('openContactModalBtn');
      if (contactUsBtn && phraseMap['BİZE ULAŞIN'] && phraseMap['BİZE ULAŞIN'][lang]) {
        contactUsBtn.innerText = phraseMap['BİZE ULAŞIN'][lang];
      }

      const topCatalogBtn = document.querySelector('#headerTopRow a[href*="bonikimya.com"]');
      if (topCatalogBtn && phraseMap['Katalog'] && phraseMap['Katalog'][lang]) {
        topCatalogBtn.innerHTML = `<i class="las la-book-open mr-1.5 text-sm text-neutral-400"></i> ${phraseMap['Katalog'][lang]}`;
      }
      const topDealerBtn = document.querySelectorAll('#headerTopRow a')[1];
      if (topDealerBtn && topDealerBtn !== topCatalogBtn && phraseMap['Bayi Girişi'] && phraseMap['Bayi Girişi'][lang]) {
        topDealerBtn.innerHTML = `<i class="las la-user mr-1.5 text-sm text-neutral-400"></i> ${phraseMap['Bayi Girişi'][lang]}`;
      }

      // 4. Subpage Banner Titles & Descriptions
      const pathname = window.location.pathname.toLowerCase();
      const pageH1 = document.querySelector('section.relative h1');
      const pageH1Desc = document.querySelector('section.relative h1 + p, section.relative h1 ~ p');
      const dict = (typeof translations !== 'undefined') ? (translations[lang] || translations['tr']) : null;

      if (dict) {
        if (pathname.includes('hakkimizda')) {
          if (pageH1) pageH1.innerText = dict.page_about_title;
          if (pageH1Desc) pageH1Desc.innerText = dict.page_about_desc;
        } else if (pathname.includes('urunlerimiz')) {
          if (pageH1) pageH1.innerText = dict.page_products_title;
          if (pageH1Desc) pageH1Desc.innerText = dict.page_products_desc;
        } else if (pathname.includes('makina-danismanligi')) {
          if (pageH1) pageH1.innerText = dict.page_machine_title;
          if (pageH1Desc) pageH1Desc.innerText = dict.page_machine_desc;
        } else if (pathname.includes('hammadde-danismanligi')) {
          if (pageH1) pageH1.innerText = dict.page_raw_title;
          if (pageH1Desc) pageH1Desc.innerText = dict.page_raw_desc;
        } else if (pathname.includes('private-label')) {
          if (pageH1) pageH1.innerText = dict.page_pl_title;
          if (pageH1Desc) pageH1Desc.innerText = dict.page_pl_desc;
        } else if (pathname.includes('ar-ge')) {
          if (pageH1) pageH1.innerText = dict.page_arge_title;
          if (pageH1Desc) pageH1Desc.innerText = dict.page_arge_desc;
        } else if (pathname.includes('ihracat')) {
          if (pageH1) pageH1.innerText = dict.page_export_title;
          if (pageH1Desc) pageH1Desc.innerText = dict.page_export_desc;
        } else if (pathname.includes('kalite-politikamiz')) {
          if (pageH1) pageH1.innerText = dict.page_quality_title;
          if (pageH1Desc) pageH1Desc.innerText = dict.page_quality_desc;
        } else if (pathname.includes('is-sagligi-guvenligi')) {
          if (pageH1) pageH1.innerText = dict.page_ohs_title;
          if (pageH1Desc) pageH1Desc.innerText = dict.page_ohs_desc;
        } else if (pathname.includes('sertifikalarimiz')) {
          if (pageH1) pageH1.innerText = dict.page_cert_title;
          if (pageH1Desc) pageH1Desc.innerText = dict.page_cert_desc;
        } else if (pathname.includes('haberler')) {
          if (pageH1 && dict.page_news_title) pageH1.innerText = dict.page_news_title;
          if (pageH1Desc && dict.page_news_desc) pageH1Desc.innerText = dict.page_news_desc;
        } else if (pathname.includes('iletisim')) {
          if (pageH1 && dict.page_contact_title) pageH1.innerText = dict.page_contact_title;
          if (pageH1Desc && dict.page_contact_desc) pageH1Desc.innerText = dict.page_contact_desc;
        } else if (pathname.includes('kvkk')) {
          if (pageH1 && dict.page_kvkk_title) pageH1.innerText = dict.page_kvkk_title;
          if (pageH1Desc && dict.page_kvkk_desc) pageH1Desc.innerText = dict.page_kvkk_desc;
        }
      }

      // 5. Deep Recursive DOM Text-Node Walker (100% Complete Site & Dropdown Translation)
      const walkAndTranslate = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const raw = node.nodeValue.trim();
          if (!raw || raw.length < 2) return;

          if (!node._origText) {
            node._origText = raw;
          }
          const orig = node._origText;

          if (lang === 'tr') {
            if (node.nodeValue.includes(raw)) {
              node.nodeValue = node.nodeValue.replace(raw, orig);
            }
            return;
          }

          if (phraseMap[orig] && phraseMap[orig][lang]) {
            node.nodeValue = node.nodeValue.replace(raw, phraseMap[orig][lang]);
          } else {
            for (const [key, valObj] of Object.entries(phraseMap)) {
              if (orig.includes(key) && valObj[lang]) {
                node.nodeValue = node.nodeValue.replace(key, valObj[lang]);
                break;
              }
            }
          }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const tag = node.tagName.toLowerCase();
          if (['script', 'style', 'svg', 'noscript', 'code'].includes(tag)) return;

          ['placeholder', 'alt', 'title'].forEach(attr => {
            if (node.hasAttribute(attr)) {
              const val = node.getAttribute(attr).trim();
              if (!node[`_orig_${attr}`]) {
                node[`_orig_${attr}`] = val;
              }
              const orig = node[`_orig_${attr}`];

              if (lang === 'tr') {
                node.setAttribute(attr, orig);
              } else if (phraseMap[orig] && phraseMap[orig][lang]) {
                node.setAttribute(attr, phraseMap[orig][lang]);
              }
            }
          });

          Array.from(node.childNodes).forEach(child => walkAndTranslate(child));
        }
      };

      walkAndTranslate(document.body);

      // 6. Update Header Language Selector Trigger Button UI
      const langBtn = document.querySelector('#headerTopRow .group\\/lang button');
      const currentLangObj = languagesObj.find(l => l.code === lang) || languagesObj[0];
      if (langBtn) {
        langBtn.innerHTML = `
          <i class="las la-globe mr-1.5 text-sm text-neutral-400"></i>
          ${currentLangObj.name}
          <i class="las la-angle-down ml-1 text-[10px]"></i>
        `;
      }
    };

    // Setup Language Dropdown
    const langGroup = document.querySelector('#headerTopRow .group\\/lang');
    if (langGroup) {
      const dropdownMenu = langGroup.querySelector('.absolute');
      if (dropdownMenu) {
        dropdownMenu.innerHTML = languagesObj.map(lang => `
          <a data-lang="${lang.code}" class="lang-option">
            <img src="${lang.flag}" alt="${lang.name} Flag" class="w-4 mr-2 object-cover rounded-xs" /> ${lang.name}
          </a>
        `).join('');

        dropdownMenu.addEventListener('click', (e) => {
          const target = e.target.closest('a[data-lang]');
          if (target) {
            e.preventDefault();
            const langCode = target.getAttribute('data-lang');
            
            let currentFile = window.location.pathname.split('/').pop() || 'index.html';
            supportedLangs.forEach(l => {
              if (currentFile === l) currentFile = 'index.html';
            });

            const newPath = langCode === 'tr' ? `/${currentFile}` : `/${langCode}/${currentFile}`;
            window.history.pushState({ lang: langCode }, '', newPath);
            localStorage.setItem('boni_selected_lang', langCode);

            applyTranslations(langCode);
          }
        });
      }
    }

    window.addEventListener('popstate', () => {
      const lang = getLangFromUrl();
      applyTranslations(lang);
    });

    applyTranslations(currentLang);
  };

  initNativeTranslator();

});

