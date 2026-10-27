/**
 * The Daily Planet Newsroom - Category Page Controller
 * Handles dedicated pages for Campus News, Technology, Sports, and Culture.
 * Manages category subtopic filters, sorting, and dynamic grid rendering.
 */

document.addEventListener('DOMContentLoaded', async () => {
  const categoryContainer = document.getElementById('category-articles-grid');
  if (!categoryContainer) return;
  await initCategoryPage();
});

let categoryArticles = [];
let activeSubtopic = 'all';
let activeCategorySort = 'newest';
let currentCategorySlug = '';

async function initCategoryPage() {
  if (!window.DailyPlanet) return;

  // Determine category slug from body data-attribute or URL query param
  const bodyCategory = document.body.getAttribute('data-category');
  const urlParams = new URLSearchParams(window.location.search);
  currentCategorySlug = (urlParams.get('cat') || bodyCategory || '').toLowerCase();

  try {
    const allArticles = await window.DailyPlanet.getArticles();
    categoryArticles = allArticles.filter(a => a.categorySlug.toLowerCase() === currentCategorySlug);

    setupSubtopicChips();
    setupCategorySort();
    renderCategoryGrid();

    // Listen for bookmark updates
    window.addEventListener('bookmarksUpdated', () => {
      renderCategoryGrid();
    });
  } catch (err) {
    console.error('Error initializing category page:', err);
  }
}

function setupSubtopicChips() {
  const chips = document.querySelectorAll('.category-subtopic-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      activeSubtopic = chip.getAttribute('data-tag').toLowerCase();
      renderCategoryGrid();
    });
  });
}

function setupCategorySort() {
  const sortSelect = document.getElementById('category-sort-select');
  sortSelect?.addEventListener('change', (e) => {
    activeCategorySort = e.target.value;
    renderCategoryGrid();
  });
}

function renderCategoryGrid() {
  const container = document.getElementById('category-articles-grid');
  const countEl = document.getElementById('category-results-count');
  if (!container) return;

  let pool = [...categoryArticles];

  // Filter by subtopic tag if selected
  if (activeSubtopic !== 'all') {
    pool = pool.filter(a => {
      return a.tags && a.tags.some(tag => tag.toLowerCase().includes(activeSubtopic));
    });
  }

  // Apply sorting
  if (activeCategorySort === 'newest') {
    pool.sort((a, b) => b.timestamp - a.timestamp);
  } else if (activeCategorySort === 'popular') {
    pool.sort((a, b) => b.views - a.views);
  } else if (activeCategorySort === 'readtime') {
    pool.sort((a, b) => parseInt(a.readTime) - parseInt(b.readTime));
  }

  if (countEl) {
    countEl.textContent = `Showing ${pool.length} ${pool.length === 1 ? 'article' : 'articles'}`;
  }

  if (!pool.length) {
    container.innerHTML = `
      <div class="empty-state-box" style="grid-column: 1 / -1;">
        <div class="empty-state-icon">📂</div>
        <h3 class="empty-state-title">No articles found in this topic</h3>
        <p class="empty-state-desc">Select "All Topics" above to explore all coverage in this section.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = pool.map(story => {
    const isSaved = window.DailyPlanet.isArticleSaved(story.id);

    return `
      <article class="article-card">
        <div class="card-image-box">
          <img src="${story.image}" alt="${window.DailyPlanetUI.escapeHtml(story.title)}" loading="lazy">
          <button class="card-bookmark-btn ${isSaved ? 'is-saved' : ''}" 
                  data-id="${story.id}" 
                  aria-label="${isSaved ? 'Remove from saved' : 'Save article'}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
          </button>
        </div>
        <div class="card-body">
          <span class="eyebrow-category">${window.DailyPlanetUI.escapeHtml(story.category)}</span>
          <h3 class="card-title">
            <a href="article.html?id=${encodeURIComponent(story.id)}">${window.DailyPlanetUI.escapeHtml(story.title)}</a>
          </h3>
          <p class="card-excerpt">${window.DailyPlanetUI.escapeHtml(story.subtitle)}</p>
          <div class="card-meta">
            <div class="author-chip">
              <img src="${story.author.avatar}" alt="${window.DailyPlanetUI.escapeHtml(story.author.name)}" class="author-avatar-sm">
              <span>${window.DailyPlanetUI.escapeHtml(story.author.name)}</span>
            </div>
            <span class="meta-dot">•</span>
            <span>${story.readTime}</span>
          </div>
        </div>
      </article>
    `;
  }).join('');
}
