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
      card.className = 'card';
      card.innerHTML = `
        <img src="${product.img}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.desc}</p>
        <div class="meta">
          <div class="price-small">$${product.price}</div>
          <a class="whatsapp" href="javascript:openWhatsApp('${product.name}')">Order on WhatsApp</a>
        </div>
      `;
      grid.appendChild(card);
    });
  } catch (err) {
    console.error('Ürünler yüklenemedi:', err);
  }
}

// Sayfa yüklendiğinde ürünleri çek
document.addEventListener('DOMContentLoaded', loadProducts);
