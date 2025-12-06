document.addEventListener('DOMContentLoaded', () => {
  const books = [
    { title: 'Atomic Habits', author: 'James Clear', year: 2018, tags: ['Habits', 'Self-help'], featured: true },
    { title: 'Deep Work', author: 'Cal Newport', year: 2016, tags: ['Productivity', 'Focus'], featured: true },
    { title: 'Clean Code', author: 'Robert C. Martin', year: 2008, tags: ['Programming', 'Best Practices'], featured: false },
    { title: 'The Pragmatic Programmer', author: 'Andrew Hunt, David Thomas', year: 1999, tags: ['Programming', 'Craft'], featured: false },
    { title: 'Hooked', author: 'Nir Eyal', year: 2014, tags: ['Psychology', 'Product'], featured: false },
    { title: 'Start With Why', author: 'Simon Sinek', year: 2009, tags: ['Leadership', 'Inspiration'], featured: false }
  ];

  const allGrid = document.getElementById('book-grid');
  const featuredGrid = document.getElementById('featured-grid');
  const searchInput = document.getElementById('search');
  if (!allGrid) return;

  // Render Featured (simple loop)
  if (featuredGrid) {
    featuredGrid.innerHTML = '';
    for (let i = 0; i < books.length; i++) {
      const b = books[i];
      if (!b.featured) continue;
      const col = document.createElement('div');
      col.className = 'col-12 col-sm-6 col-lg-4';
      const tags = b.tags.map(t => `<span class="badge bg-secondary me-1">${t}</span>`).join('');
      col.innerHTML = `
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${b.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${b.author}</h6>
            <p class="card-text">Published: ${b.year}</p>
            <div>${tags}</div>
          </div>
        </div>
      `;
      featuredGrid.appendChild(col);
    }
  }

  // Render All (simple loop)
  function renderAll(list) {
    allGrid.innerHTML = '';
    for (let i = 0; i < list.length; i++) {
      const b = list[i];
      const col = document.createElement('div');
      col.className = 'col-12 col-sm-6 col-lg-4';
      const tags = b.tags.map(t => `<span class="badge bg-secondary me-1">${t}</span>`).join('');
      col.innerHTML = `
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${b.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${b.author}</h6>
            <p class="card-text">Published: ${b.year}</p>
            <div>${tags}</div>
          </div>
        </div>
      `;
      allGrid.appendChild(col);
    }
  }

  renderAll(books);

  // Simple search (title/author)
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase();
      const out = [];
      for (let i = 0; i < books.length; i++) {
        const b = books[i];
        if (b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)) {
          out.push(b);
        }
      }
      renderAll(out);
    });
  }
});
