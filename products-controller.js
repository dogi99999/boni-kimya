// Boni Kimya Products Catalog Controller
import { products } from './products-db.js';

document.addEventListener('DOMContentLoaded', () => {
  // --- UI Elements ---
  const productsGrid = document.getElementById('productsGrid');
  const emptyState = document.getElementById('emptyState');
  const searchInput = document.getElementById('searchInput');
  const categoriesFilterContainer = document.getElementById('categoriesFilterContainer');
  const brandsFilterContainer = document.getElementById('brandsFilterContainer');
  const sizesFilterContainer = document.getElementById('sizesFilterContainer');
  const sizeFilterWrapper = document.getElementById('sizeFilterWrapper');
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');
  const resultCount = document.getElementById('resultCount');
  const sortSelect = document.getElementById('sortSelect');
  const activeBrandName = document.getElementById('activeBrandName');

  // --- Brand Selection Modal Elements ---
  const brandSelectorModal = document.getElementById('brandSelectorModal');
  const brandModalBackdrop = document.getElementById('brandModalBackdrop');
  const brandModalCard = document.getElementById('brandModalCard');
  const openBrandModalBtn = document.getElementById('openBrandModalBtn');
  const closeBrandModalBtn = document.getElementById('closeBrandModalBtn');
  const brandSelectCards = document.querySelectorAll('.brand-select-card');

  // --- Detail Modal Elements ---
  const productDetailModal = document.getElementById('productDetailModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalCard = document.getElementById('modalCard');
  const closeDetailModalBtn = document.getElementById('closeDetailModalBtn');
  const modalProductImage = document.getElementById('modalProductImage');
  const modalProductBrand = document.getElementById('modalProductBrand');
  const modalProductCategory = document.getElementById('modalProductCategory');
  const modalProductName = document.getElementById('modalProductName');
  const modalSpecsContainer = document.getElementById('modalSpecsContainer');
  const modalFeaturesList = document.getElementById('modalFeaturesList');
  const modalRequestQuoteBtn = document.getElementById('modalRequestQuoteBtn');

  // --- Preloader Curtain ---
  const pagePreloader = document.getElementById('pagePreloader');
  if (pagePreloader) {
    setTimeout(() => {
      pagePreloader.classList.add('slide-off');
      setTimeout(() => pagePreloader.remove(), 850);
    }, 400);
  }

  // --- Filter State ---
  let state = {
    searchQuery: '',
    selectedCategory: 'all',
    selectedBrands: [],
    selectedSizes: [],
    sortBy: 'default'
  };

  // --- Category Definition & Translation Mappings ---
  const categoriesMap = {
    'all': { tr: 'Tüm Ürünler', icon: 'las la-th-large' },
    'bebek-bezi': { tr: 'Bebek Bezi', icon: 'las la-baby' },
    'yetiskin-bezi': { tr: 'Yetişkin Bezi', icon: 'las la-user-tag' },
    'hijyenik-ped': { tr: 'Hijyenik Ped', icon: 'las la-female' },
    'islak-mendil': { tr: 'Islak Mendil & Temizlik', icon: 'las la-hand-holding-water' },
    'bebek-bakimi': { tr: 'Bebek Bakımı', icon: 'las la-heart' },
    'pamuk-urunleri': { tr: 'Pamuk Ürünleri', icon: 'las la-cloud' }
  };

  // --- Main Brand Definitions ---
  const mainBrands = ['Boni Baby', 'Baby Nice', 'Pomiks', 'Boni Bravo'];

  // --- Hero Banner Definitions ---
  const heroContentMap = {
    'all': {
      title: 'Ürün <span style="color: #0284c7;">Portföyümüz</span>',
      desc: 'Bebek bakımından yetişkin hijyenine, günlük koruyucu pedlerden ıslak mendil ve temizlik çözümlerine kadar üstün kaliteli ürünlerimizle küresel standartlarda hizmet vermekteyiz.',
      bg: '/categories/boni_kimya_fabrika.png',
      badgeText: 'GENİŞ ÜRÜN YELPAZESİ',
      badgeColor: 'text-sky-700 bg-sky-50 border-sky-200'
    },
    'bebek-bezi': {
      title: 'Bebek <span style="color: #0284c7;">Bezleri</span>',
      desc: 'Bebeğinizin hassas cildi için ekstra yumuşaklık, üstün emicilik ve kuruluk sunan yüksek kaliteli bebek bezlerimiz.',
      bg: '/categories/bebek_bezi.png',
      badgeText: 'BEBEK BAKIM KATEGORİSİ',
      badgeColor: 'text-sky-700 bg-sky-50 border-sky-200'
    },
    'yetiskin-bezi': {
      title: 'Yetişkin <span style="color: #0d9488;">Bezleri</span>',
      desc: 'Yüksek emiş gücü ve sızdırmazlık özellikleri ile hareket özgürlüğü ve maksimum konfor sağlayan hasta ve yetişkin bezlerimiz.',
      bg: '/categories/hasta_bezi.png',
      badgeText: 'MEDİKAL & SAĞLIK KATEGORİSİ',
      badgeColor: 'text-teal-700 bg-teal-50 border-teal-200'
    },
    'hijyenik-ped': {
      title: 'Hijyenik <span style="color: #be185d;">Pedler</span>',
      desc: 'Yoğun günlerde bile yüksek koruma, maksimum konfor ve ferahlık sağlayan, cilde dost hijyenik ped serimiz.',
      bg: '/categories/hijyenik_ped.png',
      badgeText: 'KADIN HİJYENİ KATEGORİSİ',
      badgeColor: 'text-pink-700 bg-pink-50 border-pink-200'
    },
    'islak-mendil': {
      title: 'Islak Mendil <span style="color: #059669;">& Temizlik</span>',
      desc: 'Pratik, hijyenik ve alkolsüz formülüyle hem bebek bakımı hem de günlük temizlik ihtiyaçlarınız için güvenli çözümler.',
      bg: '/categories/islak_mendil.png',
      badgeText: 'TEMİZLİK & HİJYEN KATEGORİSİ',
      badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200'
    },
    'bebek-bakimi': {
      title: 'Bebek <span style="color: #ea580c;">Bakımı</span>',
      desc: 'Bebeğinizin hassas temizliği ve bakımı için özel olarak geliştirilmiş pudralı, parfümlü ve parfümsüz ıslak havlu ve bakım ürünleri.',
      bg: '/categories/bebek_bakimi.png',
      badgeText: 'BANYO & BAKIM KATEGORİSİ',
      badgeColor: 'text-orange-700 bg-orange-50 border-orange-200'
    },
    'pamuk-urunleri': {
      title: 'Pamuk <span style="color: #4f46e5;">Ürünleri</span>',
      desc: 'Kişisel bakım ve makyaj temizliği için %100 saf pamuktan üretilmiş, yumuşak ve cilde dost pamuk ürünlerimiz.',
      bg: '/categories/pamuk_urunleri.png',
      badgeText: 'SAFLIK & BAKIM KATEGORİSİ',
      badgeColor: 'text-indigo-700 bg-indigo-50 border-indigo-200'
    }
  };

  function updateHeroBanner() {
    const heroTitle = document.getElementById('heroTitle');
    const heroDesc = document.getElementById('heroDesc');
    const heroBgImage = document.getElementById('heroBgImage');
    const heroBadge = document.getElementById('heroBadge');
    const heroSection = document.getElementById('productsHeroSection') || (heroTitle ? heroTitle.closest('section') : null);
    
    if (!heroTitle || !heroDesc || !heroBgImage) return;

    const content = heroContentMap[state.selectedCategory] || heroContentMap['all'];
    
    heroTitle.innerHTML = content.title;
    heroTitle.className = "text-4xl lg:text-5xl font-black tracking-tight leading-none uppercase text-gray-900";
    
    heroDesc.textContent = content.desc;
    heroDesc.className = "mt-4 text-sm lg:text-base text-gray-600 font-medium leading-relaxed max-w-xl";

    heroBgImage.style.backgroundImage = `url('${content.bg}')`;
    heroBgImage.className = "absolute inset-0 z-0 bg-cover bg-center transition-all duration-700 opacity-5 mix-blend-multiply filter grayscale-0";

    if (heroBadge) {
      heroBadge.textContent = content.badgeText || 'ÜRÜN PORTFÖYÜMÜZ';
      heroBadge.className = `text-[11px] font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full border ${content.badgeColor}`;
    }

    if (heroSection) {
      heroSection.className = `relative pt-36 pb-20 bg-white text-gray-900 overflow-hidden border-b border-gray-100 transition-all duration-300`;
      heroSection.style.background = '#ffffff';
    }
  }

  function updateUrlParams() {
    const params = new URLSearchParams();
    if (state.selectedCategory !== 'all') {
      params.set('category', state.selectedCategory);
    }
    if (state.selectedBrands.length > 0) {
      params.set('brand', state.selectedBrands.join(','));
    }
    
    let newUrl = window.location.pathname;
    const queryString = params.toString();
    if (queryString) {
      newUrl += '?' + queryString;
    }
    window.history.pushState({ path: newUrl }, '', newUrl);
  }

  // --- Parse URL Parameters ---
  const urlParams = new URLSearchParams(window.location.search);
  const urlCategory = urlParams.get('category');
  if (urlCategory && categoriesMap[urlCategory]) {
    state.selectedCategory = urlCategory;
  }

  const urlBrand = urlParams.get('brand');
  let hasExplicitBrandUrl = false;
  if (urlBrand) {
    state.selectedBrands = urlBrand.split(',').map(b => b.trim()).filter(Boolean);
    hasExplicitBrandUrl = true;
  }

  // --- Brand Selection Modal Functions ---
  function openBrandModal() {
    if (!brandSelectorModal) return;
    brandSelectorModal.classList.remove('hidden');
    void brandSelectorModal.offsetWidth;
    if (brandModalBackdrop) brandModalBackdrop.style.opacity = '1';
    if (brandModalCard) {
      brandModalCard.style.opacity = '1';
      brandModalCard.style.transform = 'scale(1)';
    }
    document.body.style.overflow = 'hidden';
  }

  function closeBrandModal() {
    if (!brandSelectorModal) return;
    if (brandModalBackdrop) brandModalBackdrop.style.opacity = '0';
    if (brandModalCard) {
      brandModalCard.style.opacity = '0';
      brandModalCard.style.transform = 'scale(0.95)';
    }
    setTimeout(() => {
      brandSelectorModal.classList.add('hidden');
      document.body.style.overflow = '';
    }, 300);
  }

  if (openBrandModalBtn) openBrandModalBtn.addEventListener('click', openBrandModal);
  if (closeBrandModalBtn) closeBrandModalBtn.addEventListener('click', closeBrandModal);
  if (brandModalBackdrop) brandModalBackdrop.addEventListener('click', closeBrandModal);

  brandSelectCards.forEach(card => {
    card.addEventListener('click', () => {
      const selectedBrand = card.getAttribute('data-brand');
      if (selectedBrand === 'all') {
        state.selectedBrands = [];
      } else {
        state.selectedBrands = [selectedBrand];
      }
      closeBrandModal();
      updateFiltersUI();
      renderProducts();
      updateUrlParams();
    });
  });

  // --- Brand Matcher Helper ---
  function isBrandMatch(productBrand, selectedBrands) {
    if (!selectedBrands || selectedBrands.length === 0) return true;
    return selectedBrands.some(sb => {
      const sbLower = sb.toLowerCase();
      const pbLower = productBrand.toLowerCase();
      if (sbLower === 'pomiks') return pbLower.includes('pomiks');
      if (sbLower === 'boni baby') return pbLower.includes('baby') && !pbLower.includes('nice');
      if (sbLower === 'baby nice') return pbLower.includes('nice');
      if (sbLower === 'boni bravo') return pbLower.includes('bravo');
      return pbLower === sbLower || pbLower.includes(sbLower);
    });
  }

  // --- Render Horizontal Filters ---
  function updateFiltersUI() {
    // Update Active Brand Label
    if (activeBrandName) {
      if (state.selectedBrands.length === 0) {
        activeBrandName.textContent = 'Tüm Markalar';
      } else {
        activeBrandName.textContent = state.selectedBrands.join(', ');
      }
    }

    // 1. Render Categories Horizontal Pills
    if (categoriesFilterContainer) {
      categoriesFilterContainer.innerHTML = '';
      Object.entries(categoriesMap).forEach(([slug, info]) => {
        const count = slug === 'all' 
          ? products.filter(p => !p.isBanner && isBrandMatch(p.brand, state.selectedBrands)).length 
          : products.filter(p => p.category === slug && !p.isBanner && isBrandMatch(p.brand, state.selectedBrands)).length;

        const btn = document.createElement('button');
        const isActive = state.selectedCategory === slug;
        btn.className = `px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center space-x-2 ${
          isActive
            ? 'bg-[#064e3b] text-white shadow-sm'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        }`;
        btn.innerHTML = `
          <i class="${info.icon} text-sm"></i>
          <span>${info.tr}</span>
          <span class="text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'}">${count}</span>
        `;

        btn.addEventListener('click', () => {
          state.selectedCategory = slug;
          state.selectedSizes = [];
          updateFiltersUI();
          renderProducts();
          updateHeroBanner();
          updateUrlParams();
        });

        categoriesFilterContainer.appendChild(btn);
      });
    }

    // 2. Render Brands Horizontal Pills
    if (brandsFilterContainer) {
      brandsFilterContainer.innerHTML = '';
      
      // Add 'Tüm Markalar' option first
      const allBrandBtn = document.createElement('button');
      const isAllActive = state.selectedBrands.length === 0;
      allBrandBtn.className = `px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap border transition-all cursor-pointer ${
        isAllActive
          ? 'bg-[#064e3b] text-white border-[#064e3b]'
          : 'bg-white text-gray-600 border-gray-200 hover:border-[#064e3b] hover:text-[#064e3b]'
      }`;
      allBrandBtn.textContent = 'Tüm Markalar';
      allBrandBtn.addEventListener('click', () => {
        state.selectedBrands = [];
        updateFiltersUI();
        renderProducts();
        updateUrlParams();
      });
      brandsFilterContainer.appendChild(allBrandBtn);

      // Render main brands
      mainBrands.forEach(brand => {
        const isActive = state.selectedBrands.includes(brand);
        const btn = document.createElement('button');
        btn.className = `px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap border transition-all cursor-pointer ${
          isActive
            ? 'bg-[#064e3b] text-white border-[#064e3b]'
            : 'bg-white text-gray-600 border-gray-200 hover:border-[#064e3b] hover:text-[#064e3b]'
        }`;
        btn.textContent = brand;

        btn.addEventListener('click', () => {
          if (state.selectedBrands.includes(brand)) {
            state.selectedBrands = state.selectedBrands.filter(b => b !== brand);
          } else {
            state.selectedBrands = [brand];
          }
          updateFiltersUI();
          renderProducts();
          updateUrlParams();
        });

        brandsFilterContainer.appendChild(btn);
      });
    }

    // 3. Render Sizes
    renderSizes();
  }

  function renderSizes() {
    let categoryProducts = products.filter(p => !p.isBanner && isBrandMatch(p.brand, state.selectedBrands));
    if (state.selectedCategory !== 'all') {
      categoryProducts = categoryProducts.filter(p => p.category === state.selectedCategory);
    }
    const uniqueSizes = [...new Set(categoryProducts.map(p => p.size).filter(s => s && s !== 'Standart'))];

    if (!sizeFilterWrapper) return;

    if (uniqueSizes.length === 0) {
      sizeFilterWrapper.classList.add('hidden');
      return;
    }
    sizeFilterWrapper.classList.remove('hidden');

    if (sizesFilterContainer) {
      sizesFilterContainer.innerHTML = '';
      uniqueSizes.forEach(size => {
        const isActive = state.selectedSizes.includes(size);
        const btn = document.createElement('button');
        btn.className = `px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer select-none ${
          isActive
            ? 'bg-[#064e3b] text-white border-[#064e3b]'
            : 'bg-white text-gray-600 border-gray-200 hover:border-[#064e3b]'
        }`;
        btn.textContent = size;

        btn.addEventListener('click', () => {
          if (state.selectedSizes.includes(size)) {
            state.selectedSizes = state.selectedSizes.filter(s => s !== size);
          } else {
            state.selectedSizes.push(size);
          }
          renderSizes();
          renderProducts();
        });

        sizesFilterContainer.appendChild(btn);
      });
    }
  }

  // --- Filtering & Sorting Core logic ---
  function getFilteredProducts() {
    return products.filter(product => {
      if (product.isBanner) return false;

      // 1. Search Query
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase().trim();
        const nameMatch = product.name.toLowerCase().includes(query);
        const brandMatch = product.brand.toLowerCase().includes(query);
        const sizeMatch = product.size.toLowerCase().includes(query);
        const subCatMatch = product.subCategory.toLowerCase().includes(query);
        if (!nameMatch && !brandMatch && !sizeMatch && !subCatMatch) {
          return false;
        }
      }

      // 2. Category
      if (state.selectedCategory !== 'all' && product.category !== state.selectedCategory) {
        return false;
      }

      // 3. Brands (Using isBrandMatch helper)
      if (!isBrandMatch(product.brand, state.selectedBrands)) {
        return false;
      }

      // 4. Sizes
      if (state.selectedSizes.length > 0 && !state.selectedSizes.includes(product.size)) {
        return false;
      }

      return true;
    });
  }

  function renderProducts() {
    let list = getFilteredProducts();

    // Sorting
    if (state.sortBy === 'alpha-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name, 'tr'));
    } else if (state.sortBy === 'alpha-desc') {
      list.sort((a, b) => b.name.localeCompare(a.name, 'tr'));
    }

    if (resultCount) resultCount.textContent = list.length;
    if (!productsGrid) return;

    productsGrid.innerHTML = '';

    if (list.length === 0) {
      if (emptyState) emptyState.classList.remove('hidden');
      productsGrid.classList.add('hidden');
      return;
    }

    if (emptyState) emptyState.classList.add('hidden');
    productsGrid.classList.remove('hidden');

    list.forEach(product => {
      const card = document.createElement('div');
      card.className = 'group bg-white rounded-3xl p-6 border border-gray-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 relative overflow-hidden product-card-optimized';
      
      let brandColorClass = 'bg-blue-50 text-blue-600 border-blue-100';
      if (product.brand.toLowerCase().includes('pomiks')) brandColorClass = 'bg-sky-50 text-sky-600 border-sky-100';
      if (product.brand.toLowerCase().includes('bravo')) brandColorClass = 'bg-indigo-50 text-indigo-600 border-indigo-100';
      if (product.brand.toLowerCase().includes('nice')) brandColorClass = 'bg-amber-50 text-amber-600 border-amber-100';

      card.innerHTML = `
        <div>
          <!-- Card Header Tags -->
          <div class="flex items-center justify-between mb-4">
            <span class="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded border ${brandColorClass}">
              ${product.brand}
            </span>
            <span class="text-[9px] text-gray-400 uppercase tracking-widest font-bold">
              ${categoriesMap[product.category]?.tr || product.category}
            </span>
          </div>

          <!-- Product Image Layout -->
          <div class="w-full aspect-square flex items-center justify-center p-4 bg-white rounded-2xl mb-4 border border-gray-50 overflow-hidden relative">
            <img src="${product.image}" alt="${product.name}" loading="lazy" class="max-h-full max-w-full object-contain transform scale-100 group-hover:scale-105 transition-transform duration-500 ease-out" />
          </div>

          <!-- Titles -->
          <h4 class="text-xs font-black text-gray-900 uppercase tracking-tight leading-snug line-clamp-2 min-h-[32px] group-hover:text-[#064e3b] transition-colors">
            ${product.name}
          </h4>
        </div>

        <div class="mt-4 pt-4 border-t border-gray-100">
          <div class="flex items-center justify-between">
            <div class="flex flex-col">
              <span class="text-[10px] text-gray-400 font-medium">Beden / Paket</span>
              <span class="text-xs font-black text-gray-900 mt-0.5">${product.size} / ${product.count}</span>
            </div>
            
            <button class="inspect-btn px-4 py-2 bg-gray-50 hover:bg-[#064e3b] hover:text-white text-gray-800 text-[10px] font-extrabold uppercase tracking-wider rounded-xl transition-all duration-200 cursor-pointer">
              İncele
            </button>
          </div>
        </div>
      `;

      const inspectBtn = card.querySelector('.inspect-btn');
      inspectBtn.addEventListener('click', () => openDetailModal(product));

      productsGrid.appendChild(card);
    });
  }

  // --- Modal Logic ---
  function openDetailModal(product) {
    if (!productDetailModal) return;
    modalProductImage.src = product.image;
    modalProductImage.alt = product.name;
    modalProductBrand.textContent = product.brand;
    modalProductCategory.textContent = categoriesMap[product.category]?.tr || product.category;
    modalProductName.textContent = product.name;

    modalSpecsContainer.innerHTML = '';
    if (product.details) {
      Object.entries(product.details).forEach(([key, val]) => {
        const div = document.createElement('div');
        div.className = 'flex flex-col p-3 bg-gray-50 rounded-xl border border-gray-100';
        div.innerHTML = `
          <span class="text-[9px] text-gray-400 font-extrabold uppercase tracking-wider">${key}</span>
          <span class="text-xs font-extrabold text-gray-900 mt-0.5">${val}</span>
        `;
        modalSpecsContainer.appendChild(div);
      });
    }

    modalFeaturesList.innerHTML = '';
    if (product.features) {
      product.features.forEach(feature => {
        const li = document.createElement('li');
        li.className = 'flex items-start text-xs text-gray-600 font-medium space-x-2';
        li.innerHTML = `
          <span class="flex items-center justify-center w-4 h-4 bg-emerald-50 text-emerald-500 rounded-full border border-emerald-100 mt-0.5">
            <i class="las la-check text-[9px] font-black"></i>
          </span>
          <span>${feature}</span>
        `;
        modalFeaturesList.appendChild(li);
      });
    }

    modalRequestQuoteBtn.onclick = () => {
      closeDetailModal();
      setTimeout(() => {
        const contactModal = document.getElementById('contactModal');
        const tabKurumsal = document.getElementById('tabKurumsal');
        const messageTextarea = document.querySelector('textarea[name="message"]');

        if (contactModal) {
          contactModal.classList.remove('hidden');
          void contactModal.offsetWidth;
          contactModal.classList.add('open');
          document.body.style.overflow = 'hidden';
        }

        if (messageTextarea) {
          messageTextarea.value = `Merhabalar, ${product.name} hakkında kurumsal bilgi ve fiyat teklifi almak istiyorum.`;
        }

        if (tabKurumsal) {
          tabKurumsal.click();
        }
      }, 350);
    };

    productDetailModal.classList.remove('hidden');
    void productDetailModal.offsetWidth;
    productDetailModal.classList.add('open');
    if (modalBackdrop) modalBackdrop.style.opacity = '1';
    if (modalCard) {
      modalCard.style.opacity = '1';
      modalCard.style.transform = 'scale(1)';
    }
    document.body.style.overflow = 'hidden';
  }

  function closeDetailModal() {
    if (!productDetailModal) return;
    if (modalBackdrop) modalBackdrop.style.opacity = '0';
    if (modalCard) {
      modalCard.style.opacity = '0';
      modalCard.style.transform = 'scale(0.95)';
    }
    setTimeout(() => {
      productDetailModal.classList.add('hidden');
      document.body.style.overflow = '';
    }, 300);
  }

  if (closeDetailModalBtn) closeDetailModalBtn.addEventListener('click', closeDetailModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeDetailModal);

  // Debounce helper
  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  // --- Input Bindings ---
  if (searchInput) {
    searchInput.addEventListener('input', debounce((e) => {
      state.searchQuery = e.target.value;
      renderProducts();
    }, 200));
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderProducts();
    });
  }

  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', () => {
      state.searchQuery = '';
      state.selectedCategory = 'all';
      state.selectedBrands = [];
      state.selectedSizes = [];
      state.sortBy = 'default';

      if (searchInput) searchInput.value = '';
      if (sortSelect) sortSelect.value = 'default';

      updateFiltersUI();
      renderProducts();
      updateHeroBanner();
      updateUrlParams();
    });
  }

  // Expose for global search
  window.openProductDetailModalById = function(productId) {
    const p = products.find(prod => prod.id === productId);
    if (p) openDetailModal(p);
  };

  const targetProductId = urlParams.get('product');

  // --- Initialization Execution ---
  updateFiltersUI();
  renderProducts();
  updateHeroBanner();

  if (targetProductId) {
    setTimeout(() => {
      window.openProductDetailModalById(targetProductId);
    }, 300);
  } else if (!hasExplicitBrandUrl) {
    // Open brand selection modal on direct landing if no brand specified in URL
    setTimeout(() => {
      openBrandModal();
    }, 450);
  }
});
