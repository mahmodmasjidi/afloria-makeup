// Ürünleri MongoDB'den çekip HTML'e ekleme
async function loadProducts() {
  try {
    const res = await fetch('/api/products');
    const products = await res.json();

    const grid = document.getElementById('product-grid');
    if (!grid) return;

    grid.innerHTML = ''; // önceki ürünleri temizle

    // Kategorilere ayır
    const categories = {};
    products.forEach(p => {
      const cat = p.category || "Other";
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(p);
    });

    // Her kategori için başlık + ürün kartları
    Object.keys(categories).forEach(cat => {
      const section = document.createElement('div');
      section.className = "category-section";

      // kategori başlığı
      section.innerHTML = `<h3 class="category-title">${cat}</h3>`;

      // ürün listesi container
      const catGrid = document.createElement('div');
      catGrid.className = "grid";

      categories[cat].forEach(product => {
        const card = document.createElement('article');
        card.className = 'product-card';

        // Slider için img dizisi
        const imgs = product.imgs && product.imgs.length > 0
          ? product.imgs.map(i => "/images/" + i)
          : [product.img || "/images/mainproduct.png"];
        let currentImg = 0;

        card.innerHTML = `
          <img src="${imgs[0]}" alt="${product.name}">
          <h4>${product.name}</h4>
          <p>${product.desc || ''}</p>
          <div class="meta">
            <div class="price">${product.price} AFN</div>
            <a class="whatsapp" href="javascript:openWhatsApp('${product.name}')">Order on WhatsApp</a>
          </div>
        `;

        catGrid.appendChild(card);

        // Birden fazla foto varsa slider
        if (imgs.length > 1) {
          const imgEl = card.querySelector('img');
          setInterval(() => {
            currentImg = (currentImg + 1) % imgs.length;
            imgEl.src = imgs[currentImg];
          }, 2500);
        }
      });

      section.appendChild(catGrid);
      grid.appendChild(section);
    });

  } catch (err) {
    console.error('Ürünler yüklenemedi:', err);
  }
}

// Sayfa yüklendiğinde ürünleri çek
document.addEventListener('DOMContentLoaded', loadProducts);
// Kategori filtre butonları
document.querySelectorAll('.category-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // aktif butonu değiştir
    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cat = btn.dataset.category;
    document.querySelectorAll('.category-section').forEach(section => {
      if (cat === "all" || section.querySelector('.category-title').textContent.toLowerCase() === cat) {
        section.style.display = "block";
      } else {
        section.style.display = "none";
      }
    });
  });
});
