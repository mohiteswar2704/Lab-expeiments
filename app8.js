class Product {
  constructor(title, price, description) {
    this.title = title;
    this.price = price;
    this.description = description;
  }
  getPriceLabel() {
    return `$${this.price.toFixed(2)}`;
  }
}

class FeaturedProduct extends Product {
  constructor(title, price, description) {
    super(title, price, description);
    this.isFeatured = true;
  }
  getBadge() {
    return this.isFeatured ? 'Featured' : '';
  }
}

function renderProductCard(p) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <div class="title">${p.title}</div>
    <div class="price">${p.getPriceLabel()}</div>
    <div class="desc">${p.description}</div>
    ${p.getBadge ? `<span class="badge">${p.getBadge()}</span>` : ''}
  `;
  return card;
}

function renderProducts(list) {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = '';
  for (let i = 0; i < list.length; i++) {
    grid.appendChild(renderProductCard(list[i]));
  }
}

function setupThemeToggle() {
  const btn = document.getElementById('toggle-theme');
  btn.addEventListener('click', () => {
    const root = document.documentElement;
    const current = root.getAttribute('data-theme') || 'light';
    root.setAttribute('data-theme', current === 'light' ? 'dark' : 'light');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const items = [
    new Product('Notebook', 7.99, 'A simple ruled notebook for daily notes.'),
    new FeaturedProduct('Wireless Mouse', 19.99, 'Smooth, ergonomic mouse with long battery life.'),
    new Product('Water Bottle', 12.5, 'Insulated stainless steel bottle keeps drinks cold.'),
    new FeaturedProduct('Headphones', 39.0, 'Comfortable over-ear headphones with clear sound.'),
  ];

  renderProducts(items);
  setupThemeToggle();
});
