import { products } from './products-db.js';

export function initGlobalSearch() {
  let modal = document.getElementById('globalSearchModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'globalSearchModal';
    modal.className = 'fixed inset-0 z-[100] hidden flex items-start justify-center pt-16 sm:pt-24 px-4';
    modal.innerHTML = `
      <div class="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300 opacity-0" id="globalSearchBackdrop"></div>
      <div class="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-300 scale-95 opacity-0 z-10" id="globalSearchCard">
        
        <div class="flex items-center px-6 py-4 border-b border-gray-100 bg-gray-50/60">
          <i class="las la-search text-2xl text-[#064e3b] mr-3"></i>
          <input type="text" id="globalSearchInput" placeholder="Tüm ürünlerde hızlı ara (örn: Pomiks, bebek bezi, ped, mendil...)" class="w-full bg-transparent text-sm md:text-base font-bold text-gray-900 focus:outline-none placeholder-gray-400" autocomplete="off" />
          <button id="closeGlobalSearchBtn" class="p-2 text-gray-400 hover:text-gray-700 transition-colors rounded-xl hover:bg-gray-200/50 cursor-pointer">
            <i class="las la-times text-xl"></i>
          </button>
        </div>

        <div class="max-h-[60vh] overflow-y-auto p-4 space-y-2" id="globalSearchResults">
          <div class="text-center py-12 text-gray-400 text-xs">
            <i class="las la-search text-4xl block mb-2 opacity-30 text-[#064e3b]"></i>
            Aramak istediğiniz ürün adını, markayı veya boyutu yazın...
          </div>
        </div>

        <div class="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
          <span id="globalSearchCount">Toplam ${products.length} ürün listeleniyor</span>
          <a href="/urunlerimiz.html" class="text-[#064e3b] font-bold hover:underline flex items-center">
            <span>Tüm Kataloğu Gör</span>
            <i class="las la-arrow-right ml-1"></i>
          </a>
        </div>

      </div>
    `;
    document.body.appendChild(modal);
  }

  const backdrop = document.getElementById('globalSearchBackdrop');
  const card = document.getElementById('globalSearchCard');
  const input = document.getElementById('globalSearchInput');
  const closeBtn = document.getElementById('closeGlobalSearchBtn');
  const resultsContainer = document.getElementById('globalSearchResults');
  const countSpan = document.getElementById('globalSearchCount');

  function openSearchModal() {
    modal.classList.remove('hidden');
    void modal.offsetWidth;
    backdrop.style.opacity = '1';
    card.style.opacity = '1';
    card.style.transform = 'scale(1)';
    document.body.style.overflow = 'hidden';
    setTimeout(() => input.focus(), 100);
    renderResults(input.value.trim());
  }

  function closeSearchModal() {
    backdrop.style.opacity = '0';
    card.style.opacity = '0';
    card.style.transform = 'scale(0.95)';
    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }, 250);
  }

  function renderResults(query) {
    if (!query) {
      resultsContainer.innerHTML = `
        <div class="text-center py-10 text-gray-400 text-xs">
          <i class="las la-search text-3xl block mb-2 text-[#064e3b] opacity-40"></i>
          Aramak istediğiniz ürün adını, markayı veya bedeni yazın...
        </div>
      `;
      countSpan.textContent = `Toplam ${products.length} ürün kataloğu hazır`;
      return;
    }

    const q = query.toLowerCase();
    const matches = products.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.brand.toLowerCase().includes(q) || 
      p.category.toLowerCase().includes(q) || 
      (p.size && p.size.toLowerCase().includes(q)) ||
      (p.subCategory && p.subCategory.toLowerCase().includes(q))
    );

    countSpan.textContent = `${matches.length} ürün bulundu`;

    if (matches.length === 0) {
      resultsContainer.innerHTML = `
        <div class="text-center py-10 text-gray-400 text-xs">
          <i class="las la-frown text-3xl block mb-2 opacity-40"></i>
          "${query}" aramasına uygun ürün bulunamadı.
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = matches.map(p => `
      <a href="/urunlerimiz.html?product=${p.id}" data-product-id="${p.id}" class="search-result-item flex items-center p-3 rounded-2xl hover:bg-emerald-50/70 transition-all duration-200 border border-transparent hover:border-emerald-100 group cursor-pointer">
        <div class="w-14 h-14 rounded-xl overflow-hidden bg-white shrink-0 mr-4 border border-gray-100 flex items-center justify-center p-1 shadow-xs">
          <img src="${p.image}" alt="${p.name}" class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center space-x-2">
            <span class="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 bg-emerald-100 text-[#064e3b] rounded">${p.brand}</span>
            ${p.size ? `<span class="text-[9px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">${p.size}</span>` : ''}
          </div>
          <h4 class="text-xs font-bold text-gray-900 group-hover:text-[#064e3b] transition-colors truncate mt-1">${p.name}</h4>
        </div>
        <div class="shrink-0 ml-3 text-xs font-bold text-[#064e3b] flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span>İncele</span>
          <i class="las la-arrow-right ml-1"></i>
        </div>
      </a>
    `).join('');

    resultsContainer.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const pid = item.getAttribute('data-product-id');
        closeSearchModal();

        if (window.location.pathname.includes('urunlerimiz.html')) {
          e.preventDefault();
          history.pushState(null, '', `/urunlerimiz.html?product=${pid}`);
          if (window.openProductDetailModalById) {
            window.openProductDetailModalById(pid);
          }
        }
      });
    });
  }

  input.addEventListener('input', (e) => renderResults(e.target.value.trim()));

  closeBtn.addEventListener('click', closeSearchModal);
  backdrop.addEventListener('click', closeSearchModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeSearchModal();
    }
  });

  // Bind to all search trigger buttons across the site
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('button[aria-label="Arama Yap"], button .la-search');
    if (btn) {
      const searchButton = btn.tagName.toLowerCase() === 'button' ? btn : btn.closest('button');
      if (searchButton) {
        e.preventDefault();
        openSearchModal();
      }
    }
  });
}
