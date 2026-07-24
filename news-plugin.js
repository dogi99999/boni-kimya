// news-plugin.js - Boni Kimya Corporate Blog Engine

const localBlogPosts = [
  {
    id: 1,
    brand: "boni-baby",
    brandName: "Boni Baby",
    brandLogo: "/Markalarımız/Boni baby.jpg",
    title: "Bebek Bezi Seçiminde Nelere Dikkat Edilmeli? Boni Baby İle Kesintisiz Uykunun Sırları",
    category: "bebek-bakimi",
    categoryName: "Bebek Bezi",
    readTime: "4 dk okuma",
    date: "24 Temmuz 2026",
    summary: "Bebeğinizin cildini 12 saat boyunca kuru tutan, nefes alabilen dış yüzeyi ve dermatolojik onaylı formülüyle Boni Baby bebek bezlerinin sunduğu üstün koruma teknolojisini keşfedin.",
    content: `
      <div class="space-y-6 text-gray-700 leading-relaxed">
        <div class="flex items-center space-x-4 p-4 rounded-2xl bg-orange-50 border border-orange-100">
          <img src="/Markalarımız/Boni baby.jpg" alt="Boni Baby Logo" class="h-14 w-auto object-contain rounded-xl shadow-xs" />
          <div>
            <span class="text-xs font-black text-orange-600 uppercase tracking-widest">Boni Baby Özel Rehberi</span>
            <h4 class="text-base font-extrabold text-gray-900">Bebek Cildi İçin En Doğru Seçim</h4>
          </div>
        </div>

        <p class="text-sm">
          Anne ve babaların en büyük önceliği bebeklerinin huzurlu, sağlıklı ve kesintisiz bir uyku çekmesidir. Bebeklerin hassas cilt yapıları, yetişkinlere göre 5 kat daha ince ve hassastır. Bu nedenle bebek bezi seçimi sadece kuru tutmakla kalmamalı; cildin nefes almasını sağlamalı ve pişikleri önlemelidir.
        </p>

        <h3 class="text-lg font-black text-gray-900 border-l-4 border-orange-500 pl-3">12 Saat Boyunca Ultra Kuru ve Pamuksu Doku</h3>
        <p class="text-sm">
          <strong>Boni Baby Premium Bebek Bezleri</strong>, ileri teknoloji 3D süper emici tanecikleri (SAP) ve mikrogözenekli nefes alan dış tabakası sayesinde sıvıyı anında alt katmanlara hapseder. Bacak arası bariyerleri sızdırmayı %100 engellerken esnek yan bantlar bebeğin hareket özgürlüğünü kısıtlamaz.
        </p>

        <div class="my-6 rounded-2xl overflow-hidden shadow-md border border-gray-100">
          <img src="/categories/bebek_bezi.png" alt="Boni Baby Bebek Bezi Teknolojisi" class="w-full h-64 object-cover" />
        </div>

        <h3 class="text-lg font-black text-gray-900 border-l-4 border-orange-500 pl-3">Dermatolojik Açıdan %100 Güvenli</h3>
        <p class="text-sm">
          Boni Kimya laboratuvarlarında titizlikle geliştirilen Boni Baby bezleri, paraben, sprey alkol ve ağır kimyasallar içermez. Hipoalerjenik yapısı uluslararası dermatoloji sertifikalarıyla belgelenmiştir.
        </p>
      </div>
    `,
    image: "/categories/bebek_bezi.png"
  },
  {
    id: 2,
    brand: "baby-nice",
    brandName: "Baby Nice",
    brandLogo: "/Markalarımız/babynice.jpg",
    title: "Bebeklerin Cildine İpek Dokunuşu: Baby Nice Bebek Bezi ve Islak Mendil Mucizesi",
    category: "bebek-ve-mendil",
    categoryName: "Bebek Bezi & Islak Mendil",
    readTime: "5 dk okuma",
    date: "20 Temmuz 2026",
    summary: "Saf su içeriği, alkolsüz formülü ve pamuksu dokusuyla Baby Nice bebek bezleri ve ıslak mendil serisi günlük bakım ritüellerinde annelerin en büyük yardımcısı oluyor.",
    content: `
      <div class="space-y-6 text-gray-700 leading-relaxed">
        <div class="flex items-center space-x-4 p-4 rounded-2xl bg-orange-50 border border-orange-100">
          <img src="/Markalarımız/babynice.jpg" alt="Baby Nice Logo" class="h-14 w-auto object-contain rounded-xl shadow-xs" />
          <div>
            <span class="text-xs font-black text-orange-600 uppercase tracking-widest">Baby Nice Bakım Dünyası</span>
            <h4 class="text-base font-extrabold text-gray-900">Saf Sevgi İle Üretilen İpek Dokunuş</h4>
          </div>
        </div>

        <p class="text-sm">
          Gün içerisinde bebeğinizin alt temizliği ve günlük hijyeni onlarca kez tekrarlanır. Kullanılan ürünlerin doğal içeriklere sahip olması, cildin doğal pH dengesini korumak adına kritik önem taşır.
        </p>

        <h3 class="text-lg font-black text-gray-900 border-l-4 border-orange-500 pl-3">Alkolsüz ve Parabensiz Islak Mendil Konforu</h3>
        <p class="text-sm">
          <strong>Baby Nice Islak Mendilleri</strong>, %99 saf su bazlı temizleme sıvısı, E vitamini ve papatya özleri ile zenginleştirilmiştir. Kalın ve petek dokulu kumaş yapısı sayesinde tek bir mendille maksimum hijyen sağlar.
        </p>

        <div class="my-6 rounded-2xl overflow-hidden shadow-md border border-gray-100">
          <img src="/categories/bebek_bakimi.png" alt="Baby Nice Bebek Bakımı" class="w-full h-64 object-cover" />
        </div>

        <h3 class="text-lg font-black text-gray-900 border-l-4 border-orange-500 pl-3">Bebek Bezi ve Islak Mendilde İkili Güç</h3>
        <p class="text-sm">
          Baby Nice ürün ailesi; bebek bezi ve ıslak mendili mükemmel bir uyum içerisinde sunarak bebek cildini gün boyu kuru, yumuşak ve mis kokulu tutar.
        </p>
      </div>
    `,
    image: "/categories/bebek_bakimi.png"
  },
  {
    id: 3,
    brand: "pomiks",
    brandName: "Pomiks",
    brandLogo: "/Markalarımız/Boni pomiks.jpg",
    title: "Tüm Ailenin Günlük Hijyen Güvencesi: Pomiks Bebek Bezi, Islak Mendil ve Hijyenik Ped Çözümleri",
    category: "aile-hijyeni",
    categoryName: "Hijyenik Çözümler",
    readTime: "6 dk okuma",
    date: "15 Temmuz 2026",
    summary: "Bebek bakımından kadın hijyenine kadar geniş bir yelpazede hizmet veren Pomiks, yüksek emiciliği ve ekonomik premium kalitesiyle tüm ailenin hijyen ihtiyacını karşılıyor.",
    content: `
      <div class="space-y-6 text-gray-700 leading-relaxed">
        <div class="flex items-center space-x-4 p-4 rounded-2xl bg-orange-50 border border-orange-100">
          <img src="/Markalarımız/Boni pomiks.jpg" alt="Pomiks Logo" class="h-14 w-auto object-contain rounded-xl shadow-xs" />
          <div>
            <span class="text-xs font-black text-orange-600 uppercase tracking-widest">Pomiks Aile Ailesi</span>
            <h4 class="text-base font-extrabold text-gray-900">3'ü Bir Arada Tam Kapsamlı Hijyen</h4>
          </div>
        </div>

        <p class="text-sm">
          Bir ailenin günlük hijyen gereksinimleri oldukça çeşitlidir. Bebeklerin bez ihtiyacı, günlük mendil kullanımı ve kadınların özel gün konforu... Pomiks markamız tüm bu ihtiyaçları tek bir kalite çatısı altında topluyor.
        </p>

        <h3 class="text-lg font-black text-gray-900 border-l-4 border-orange-500 pl-3">Pomiks Hijyenik Ped Serisi</h3>
        <p class="text-sm">
          Ultra ince yapısı, geniş kanatları ve koku nötralize edici katmanıyla Pomiks hijyenik pedler, yoğun günlerde dahi %100 hareket özgürlüğü ve kuruluk sunar. Cilde nefes aldıran üst yüzeyi tahriş riskini ortadan kaldırır.
        </p>

        <div class="my-6 rounded-2xl overflow-hidden shadow-md border border-gray-100">
          <img src="/categories/hijyenik_ped.png" alt="Pomiks Hijyenik Ped ve Ürünleri" class="w-full h-64 object-cover" />
        </div>

        <h3 class="text-lg font-black text-gray-900 border-l-4 border-orange-500 pl-3">Bebek Bezinde Yüksek Sızdırmazlık</h3>
        <p class="text-sm">
          Pomiks bebek bezleri ve antibakteriyel cep ıslak mendilleri, evde ve seyahatlerde ailenizin her an yanında olan güvenilir bir hijyen dostudur.
        </p>
      </div>
    `,
    image: "/categories/hijyenik_ped.png"
  },
  {
    id: 4,
    brand: "boni-bravo",
    brandName: "Boni Bravo",
    brandLogo: "/Markalarımız/boni bravo.jpg",
    title: "Özgüven ve Sağlıkla Hayata Tutunmak: Boni Bravo Yetişkin Hasta Bezi ve Medikal Hijyen Rehberi",
    category: "yetiskin-bakim",
    categoryName: "Medikal & Yetişkin Bakım",
    readTime: "7 dk okuma",
    date: "10 Temmuz 2026",
    summary: "Hasta ve yetişkin bakımında medikal standartlarda sızdırmazlık, yüksek emicilik ve cilt dostu hava geçirgenliği sunan Boni Bravo ürün ailesini yakından tanıyın.",
    content: `
      <div class="space-y-6 text-gray-700 leading-relaxed">
        <div class="flex items-center space-x-4 p-4 rounded-2xl bg-orange-50 border border-orange-100">
          <img src="/Markalarımız/boni bravo.jpg" alt="Boni Bravo Logo" class="h-14 w-auto object-contain rounded-xl shadow-xs" />
          <div>
            <span class="text-xs font-black text-orange-600 uppercase tracking-widest">Boni Bravo Medikal Bakım</span>
            <h4 class="text-base font-extrabold text-gray-900">Yetişkin Bakımında Güven ve Saygınlık</h4>
          </div>
        </div>

        <p class="text-sm">
          İleri yaş bakımı ve medikal destek gerektiren durumlarda kullanılan hasta bezleri ve hijyen ürünleri, bireylerin yaşam kalitesini doğrudan etkiler. Boni Bravo, empati ve ileri teknolojiyle yetişkin konforunu korur.
        </p>

        <h3 class="text-lg font-black text-gray-900 border-l-4 border-orange-500 pl-3">Yüksek Emici Yetişkin Bezleri ve Emici Külotlar</h3>
        <p class="text-sm">
          <strong>Boni Bravo Yetişkin Bezleri</strong>, anatomik yapısı, tekrar yapıştırılabilir cırt cırt bantları ve ıslaklık göstergesi ile hasta bakıcılar ve hastalar için büyük kolaylık sağlar. Koku kontrol sistemi kötü kokuları hapseder.
        </p>

        <div class="my-6 rounded-2xl overflow-hidden shadow-md border border-gray-100">
          <img src="/categories/hasta_bezi.png" alt="Boni Bravo Yetişkin Hasta Bezi" class="w-full h-64 object-cover" />
        </div>

        <h3 class="text-lg font-black text-gray-900 border-l-4 border-orange-500 pl-3">Tam Kapsamlı Bakım Seti</h3>
        <p class="text-sm">
          Hasta bezi, yatak koruyucu örtü, medikal temizleme mendilleri ve hijyenik ped çözümleriyle Boni Bravo, medikal kurumlarda ve evde bakım süreçlerinde güvenin adıdır.
        </p>
      </div>
    `,
    image: "/categories/hasta_bezi.png"
  },
  {
    id: 5,
    brand: "pommy",
    brandName: "Pommy",
    brandLogo: "/Markalarımız/Pommy.png",
    title: "Küçük Keşifçiler İş Başında! Pommy Çocuk Bezi İle Özgürce Hareket Eden Mutlu Minikler",
    category: "cocuk-bezi",
    categoryName: "Çocuk Bezi",
    readTime: "4 dk okuma",
    date: "05 Temmuz 2026",
    summary: "Emekleyen ve yürümeye başlayan neşeli çocuklara özel tasarlanan Pommy esnek çocuk bezleri, süper emici katmanıyla hareketli miniklere sınırsız keşif imkanı sağlıyor.",
    content: `
      <div class="space-y-6 text-gray-700 leading-relaxed">
        <div class="flex items-center space-x-4 p-4 rounded-2xl bg-orange-50 border border-orange-100">
          <img src="/Markalarımız/Pommy.png" alt="Pommy Logo" class="h-14 w-auto object-contain rounded-xl shadow-xs" />
          <div>
            <span class="text-xs font-black text-orange-600 uppercase tracking-widest">Pommy Çocuk Dünyası</span>
            <h4 class="text-base font-extrabold text-gray-900">Hareketli Minikler İçin Ultra Esnek Koruma</h4>
          </div>
        </div>

        <p class="text-sm">
          Çocuklar büyüdükçe dünyayı keşfetme arzusu katlanarak artar. Emekleme, koşma ve oyun saatlerinde çocuk bezlerinin vücuda tam oturması ve bacak aralarında sarkma yapmaması gerekir.
        </p>

        <h3 class="text-lg font-black text-gray-900 border-l-4 border-orange-500 pl-3">360 Derece Esnek Bel ve Bacak Yan Bantları</h3>
        <p class="text-sm">
          <strong>Pommy Çocuk Bezleri</strong>, hareketli miniklerin anatomisine uyum sağlayan esnek bel yapısıyla üretilmiştir. Oyun oynarken veya uyurken bez kaymaz, sızdırma yapmaz.
        </p>

        <div class="my-6 rounded-2xl overflow-hidden shadow-md border border-gray-100">
          <img src="/categories/bebek_bezi_card.png" alt="Pommy Çocuk Bezi" class="w-full h-64 object-cover" />
        </div>

        <h3 class="text-lg font-black text-gray-900 border-l-4 border-orange-500 pl-3">Eğlenceli Desenler ve Gün Boyu Kuruluk</h3>
        <p class="text-sm">
          Pommy bezlerinin üzerindeki sevimli hayvan figürleri bez değişim seanslarını eğlenceli bir oyuna dönüştürür. Çocuğunuz özgürce keşfederken siz de arkaya yaslanıp güvenle gülümseyebilirsiniz!
        </p>
      </div>
    `,
    image: "/categories/bebek_bezi_card.png"
  }
];

export async function fetchNews() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(localBlogPosts);
    }, 100);
  });
}

export function initNews() {
  const newsContainer = document.getElementById('newsContainer');
  if (!newsContainer) return;

  const searchInput = document.getElementById('newsSearch');
  const categoryFilters = document.querySelectorAll('.category-filter');
  
  const newsModal = document.getElementById('newsModal');
  const closeNewsModalBtn = document.getElementById('closeNewsModalBtn');
  const newsModalOverlay = document.getElementById('newsModalOverlay');
  
  const modalTitle = document.getElementById('modalTitle');
  const modalMeta = document.getElementById('modalMeta');
  const modalImage = document.getElementById('modalImage');
  const modalContent = document.getElementById('modalContent');

  let allNews = [];
  let currentCategory = 'all';
  let searchQuery = '';

  fetchNews().then(data => {
    allNews = data;
    renderNews();
  });

  function renderNews() {
    const filteredNews = allNews.filter(item => {
      const matchesCategory = currentCategory === 'all' || item.category === currentCategory || item.brand === currentCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery) ||
                            item.summary.toLowerCase().includes(searchQuery) ||
                            item.brandName.toLowerCase().includes(searchQuery);
      return matchesCategory && matchesSearch;
    });

    if (filteredNews.length === 0) {
      newsContainer.innerHTML = `
        <div class="col-span-full py-16 text-center text-gray-400 select-none">
          <i class="las la-search text-4xl mb-4 text-orange-400"></i>
          <p class="text-sm font-light">Aramanıza uygun blog yazısı bulunamadı.</p>
        </div>
      `;
      return;
    }

    newsContainer.innerHTML = filteredNews.map(item => `
      <article class="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
        <div>
          <!-- Image Container with Logo Overlay -->
          <div class="relative h-56 overflow-hidden bg-gray-100 select-none">
            <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            <!-- Category Badge -->
            <span class="absolute top-4 left-4 bg-orange-600 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl shadow-md">
              ${item.categoryName}
            </span>

            <!-- Brand Logo Floating Badge -->
            <div class="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl shadow-lg border border-white/50 flex items-center space-x-2">
              <img src="${item.brandLogo}" alt="${item.brandName}" class="h-8 w-auto object-contain rounded-lg" />
              <span class="text-[10px] font-black text-gray-900 pr-1">${item.brandName}</span>
            </div>
          </div>
          
          <!-- Content Summary -->
          <div class="p-6 lg:p-8 space-y-4">
            <div class="flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              <span class="flex items-center"><i class="las la-calendar mr-1.5 text-xs text-orange-500"></i> ${item.date}</span>
              <span class="flex items-center"><i class="las la-clock mr-1.5 text-xs text-orange-500"></i> ${item.readTime}</span>
            </div>
            
            <h3 class="text-lg font-black text-gray-900 tracking-tight leading-snug group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
              ${item.title}
            </h3>
            
            <p class="text-xs text-gray-600 font-light leading-relaxed line-clamp-3">
              ${item.summary}
            </p>
          </div>
        </div>

        <!-- Read More Button -->
        <div class="px-6 pb-6 lg:px-8 lg:pb-8">
          <button data-id="${item.id}" class="read-more-btn w-full py-3 bg-orange-50 hover:bg-orange-600 text-orange-600 hover:text-white font-black text-[11px] uppercase tracking-wider rounded-2xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-xs hover:shadow-md cursor-pointer">
            <span>Yazının Devamını Oku</span>
            <i class="las la-arrow-right text-xs"></i>
          </button>
        </div>
      </article>
    `).join('');

    newsContainer.querySelectorAll('.read-more-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'), 10);
        const article = allNews.find(item => item.id === id);
        if (article) {
          openNewsModal(article);
        }
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderNews();
    });
  }

  categoryFilters.forEach(tab => {
    tab.addEventListener('click', (e) => {
      categoryFilters.forEach(t => {
        t.classList.remove('bg-orange-600', 'text-white', 'shadow-md');
        t.classList.add('bg-white', 'text-gray-700', 'border', 'border-gray-200');
      });

      tab.classList.remove('bg-white', 'text-gray-700', 'border', 'border-gray-200');
      tab.classList.add('bg-orange-600', 'text-white', 'shadow-md');

      currentCategory = tab.getAttribute('data-category');
      renderNews();
    });
  });

  function openNewsModal(article) {
    if (modalTitle) modalTitle.textContent = article.title;
    if (modalMeta) {
      modalMeta.innerHTML = `
        <div class="flex flex-wrap items-center gap-3">
          <span class="bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest px-3.5 py-1 rounded-xl shadow-xs">
            ${article.categoryName}
          </span>
          <span class="text-xs font-bold text-gray-500 flex items-center">
            <i class="las la-calendar mr-1.5 text-orange-500"></i> ${article.date}
          </span>
          <span class="text-xs font-bold text-gray-500 flex items-center">
            <i class="las la-clock mr-1.5 text-orange-500"></i> ${article.readTime}
          </span>
        </div>
      `;
    }
    if (modalImage) {
      modalImage.src = article.image;
      modalImage.alt = article.title;
    }
    if (modalContent) modalContent.innerHTML = article.content;

    if (newsModal) {
      newsModal.classList.remove('hidden');
      void newsModal.offsetWidth;
      newsModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeNewsModal() {
    if (!newsModal) return;
    newsModal.classList.remove('open');
    setTimeout(() => {
      newsModal.classList.add('hidden');
      document.body.style.overflow = '';
    }, 300);
  }

  if (closeNewsModalBtn) closeNewsModalBtn.addEventListener('click', closeNewsModal);
  if (newsModalOverlay) newsModalOverlay.addEventListener('click', closeNewsModal);
}
