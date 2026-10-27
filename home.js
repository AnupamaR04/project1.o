/**
 * The Daily Planet Newsroom - Homepage Controller
 * Renders Featured Hero Story, Trending Sidebar, Editor's Picks,
 * and dynamic Latest Stories with category filter chips and sorting.
 */

document.addEventListener('DOMContentLoaded', async () => {
  if (!document.getElementById('home-featured-hero')) return;
  await initHomePage();
});

let homeArticles = [];
let activeCategory = 'all';
let activeSort = 'newest';

async function initHomePage() {
  if (!window.DailyPlanet) return;

  try {
    homeArticles = await window.DailyPlanet.getArticles();
    
    renderFeaturedHero();
    renderTrendingSidebar();
    renderEditorsPicks();
    setupFiltersAndSort();
    renderLatestGrid();

    // Re-render latest grid if bookmarks change
    window.addEventListener('bookmarksUpdated', () => {
      renderLatestGrid();
      updateFeaturedBookmarkBtn();
    });
  } catch (err) {
    console.error('Error initializing home page:', err);
  }
}

/**
 * 1. Render Large Featured Hero Story
 */
function renderFeaturedHero() {
  const heroContainer = document.getElementById('home-featured-hero');
  if (!heroContainer) return;

  const featured = homeArticles.find(a => a.featured) || homeArticles[0];
  if (!featured) return;

  const isSaved = window.DailyPlanet.isArticleSaved(featured.id);

  heroContainer.innerHTML = `
    <article class="featured-card">
      <div class="featured-image-wrapper">
        <img src="${featured.image}" alt="${window.DailyPlanetUI.escapeHtml(featured.title)}" loading="eager">
        <span class="featured-badge">Cover Story</span>
      </div>
      <div class="featured-content">
        <span class="eyebrow-category">${window.DailyPlanetUI.escapeHtml(featured.category)}</span>
        <h2 class="featured-title">
          <a href="pages/article.html?id=${encodeURIComponent(featured.id)}">${window.DailyPlanetUI.escapeHtml(featured.title)}</a>
        </h2>
        <p class="featured-excerpt">${window.DailyPlanetUI.escapeHtml(featured.subtitle)}</p>
        <div class="card-meta">
          <div class="author-chip">
            <img src="${featured.author.avatar}" alt="${window.DailyPlanetUI.escapeHtml(featured.author.name)}" class="author-avatar-sm">
            <span>By ${window.DailyPlanetUI.escapeHtml(featured.author.name)}</span>
          </div>
          <span class="meta-dot">•</span>
          <span>${featured.date}</span>
          <span class="meta-dot">•</span>
          <span>${featured.readTime}</span>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 20px;">
          <a href="pages/article.html?id=${encodeURIComponent(featured.id)}" class="read-more-link">
            Read Full Investigation →
          </a>
          <button class="action-btn card-bookmark-btn ${isSaved ? 'is-saved' : ''}" 
                  data-id="${featured.id}" 
                  aria-label="${isSaved ? 'Remove from saved' : 'Save article'}"
                  style="position: static; width: auto; height: auto; border-radius: 4px; padding: 6px 12px;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
            <span style="font-size: 0.8rem; font-weight: 600;">${isSaved ? 'Saved' : 'Save Story'}</span>
          </button>
        </div>
      </div>
    </article>
  `;
}

function updateFeaturedBookmarkBtn() {
  const featured = homeArticles.find(a => a.featured) || homeArticles[0];
  if (!featured) return;
  const btn = document.querySelector('.featured-card .card-bookmark-btn');
  if (!btn) return;

  const isSaved = window.DailyPlanet.isArticleSaved(featured.id);
  btn.classList.toggle('is-saved', isSaved);
  const textSpan = btn.querySelector('span');
  if (textSpan) textSpan.textContent = isSaved ? 'Saved' : 'Save Story';
}

/**
 * 2. Render Trending Sidebar (Top 5 Ranked)
 */
function renderTrendingSidebar() {
  const container = document.getElementById('home-trending-list');
  if (!container) return;

  const trending = homeArticles
    .filter(a => a.trending)
    .sort((a, b) => (a.trendingRank || 99) - (b.trendingRank || 99))
    .slice(0, 5);

  container.innerHTML = trending.map((story, index) => {
    return `
      <div class="trending-item">
        <span class="trending-rank">0${index + 1}</span>
        <div class="trending-content">
          <span class="trending-category">${window.DailyPlanetUI.escapeHtml(story.category)}</span>
          <h4 class="trending-title">
            <a href="pages/article.html?id=${encodeURIComponent(story.id)}">${window.DailyPlanetUI.escapeHtml(story.title)}</a>
          </h4>
          <div class="trending-meta">
            <span>${story.readTime}</span> • <span>${story.views.toLocaleString()} reads</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * 3. Render Editor's Pick Callout Box
 */
function renderEditorsPicks() {
  const container = document.getElementById('home-editors-picks');
  if (!container) return;

  const picks = homeArticles.filter(a => a.editorsPick).slice(0, 4);

  container.innerHTML = picks.map(story => {
    return `
      <div class="editors-pick-item">
        <span class="eyebrow-category" style="font-size: 0.7rem; margin-bottom: 2px;">${window.DailyPlanetUI.escapeHtml(story.category)}</span>
        <h4 class="editors-pick-title">
          <a href="pages/article.html?id=${encodeURIComponent(story.id)}">${window.DailyPlanetUI.escapeHtml(story.title)}</a>
        </h4>
        <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;">
          By ${window.DailyPlanetUI.escapeHtml(story.author.name)} · ${story.date}
        </div>
      </div>
    `;
  }).join('');
}

/**
 * 4. Setup Category Filter Chips & Sort Select
 */
function setupFiltersAndSort() {
  const chips = document.querySelectorAll('.filter-chip');
  const sortSelect = document.getElementById('sort-articles-select');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      activeCategory = chip.getAttribute('data-category');
      renderLatestGrid();
    });
  });

  sortSelect?.addEventListener('change', (e) => {
    activeSort = e.target.value;
    renderLatestGrid();
  });
}

/**
 * 5. Render Latest Stories Grid with Filter & Sort
 */
function renderLatestGrid() {
  const container = document.getElementById('home-latest-grid');
  const countEl = document.getElementById('results-count-text');
  if (!container) return;

  // Filter out the cover story from standard grid to avoid redundancy
  const featuredId = (homeArticles.find(a => a.featured) || {}).id;
  let pool = homeArticles.filter(a => a.id !== featuredId);

  // Apply Category Filter
  if (activeCategory !== 'all') {
    pool = pool.filter(a => a.categorySlug.toLowerCase() === activeCategory.toLowerCase());
  }

  // Apply Sort
  if (activeSort === 'newest') {
    pool.sort((a, b) => b.timestamp - a.timestamp);
  } else if (activeSort === 'popular') {
    pool.sort((a, b) => b.views - a.views);
  } else if (activeSort === 'readtime') {
    pool.sort((a, b) => parseInt(a.readTime) - parseInt(b.readTime));
  }

  // Update counter
  if (countEl) {
    countEl.textContent = `Showing ${pool.length} ${pool.length === 1 ? 'story' : 'stories'} in this view`;
  }

  if (!pool.length) {
    container.innerHTML = `
      <div class="empty-state-box" style="grid-column: 1 / -1;">
        <div class="empty-state-icon">📰</div>
        <h3 class="empty-state-title">No stories match this filter</h3>
        <p class="empty-state-desc">Try selecting "All Categories" or changing your sort preferences.</p>
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
            <a href="pages/article.html?id=${encodeURIComponent(story.id)}">${window.DailyPlanetUI.escapeHtml(story.title)}</a>
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
