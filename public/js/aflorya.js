// Ürünleri MongoDB'den çekip HTML'e ekleme
async function loadProducts() {
  try {
    const res = await fetch('/api/products');
    const products = await res.json();

    const grid = document.getElementById('product-grid');
    if (!grid) return;

    grid.innerHTML = ''; // öncekileri temizle

    products.forEach(product => {
      const card = document.createElement('article');
  card.className = 'product-card';


      // Slider için img dizisi
      const imgs = product.imgs && product.imgs.length > 0 ? product.imgs.map(i => "/images/" + i) : [product.img || "/images/mainproduct.png"];
      let currentImg = 0;

      card.innerHTML = `
        <img src="${imgs[0]}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.desc || ''}</p>
        <div class="meta">
  <div class="price">${product.price} AFG</div>
          <a class="whatsapp" href="javascript:openWhatsApp('${product.name}')">Order on WhatsApp</a>
        </div>
      `;

      grid.appendChild(card);

      // Birden fazla foto varsa 2.5 saniyede bir değiştir
      if (imgs.length > 1) {
        const imgEl = card.querySelector('img');
        setInterval(() => {
          currentImg = (currentImg + 1) % imgs.length;
          imgEl.src = imgs[currentImg];
        }, 2500); // 2.5 saniye
      }
    });
  } catch (err) {
    console.error('Ürünler yüklenemedi:', err);
  }
}

// Sayfa yüklendiğinde ürünleri çek
document.addEventListener('DOMContentLoaded', loadProducts);
