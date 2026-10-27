/**
 * The Daily Planet Newsroom - Saved Articles View Controller
 * Manages user bookmarks, list rendering, individual removal, and bulk clear.
 */

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('saved-articles-grid');
  if (!container) return;
  await initSavedPage();
});

async function initSavedPage() {
  if (!window.DailyPlanet) return;

  renderSavedArticles();

  // Listen for bookmark updates
  window.addEventListener('bookmarksUpdated', () => {
    renderSavedArticles();
  });

  const clearBtn = document.getElementById('clear-all-saved-btn');
  clearBtn?.addEventListener('click', () => {
    const list = window.DailyPlanet.getSavedBookmarks();
    if (!list.length) return;

    if (confirm('Are you sure you want to clear all saved articles from your reading list?')) {
      window.DailyPlanet.clearAllBookmarks();
      window.DailyPlanetUI.showToast('All saved articles have been cleared.');
    }
  });
}

async function renderSavedArticles() {
  const container = document.getElementById('saved-articles-grid');
  const countEl = document.getElementById('saved-total-count');
  const clearBtn = document.getElementById('clear-all-saved-btn');
  if (!container) return;

  const savedIds = window.DailyPlanet.getSavedBookmarks();
  const allArticles = await window.DailyPlanet.getArticles();
  const savedStories = allArticles.filter(a => savedIds.includes(a.id));

  if (countEl) {
    countEl.textContent = `${savedStories.length} ${savedStories.length === 1 ? 'story' : 'stories'} saved`;
  }

  if (clearBtn) {
    clearBtn.style.display = savedStories.length > 0 ? 'inline-flex' : 'none';
  }

  if (!savedStories.length) {
    container.innerHTML = `
      <div class="empty-state-box" style="grid-column: 1 / -1;">
        <div class="empty-state-icon">🔖</div>
        <h3 class="empty-state-title">Your Reading Archive is Empty</h3>
        <p class="empty-state-desc">You haven't bookmarked any campus stories yet. Tap the bookmark icon on any article to save it for offline reading.</p>
        <a href="../index.html" class="submit-comment-btn" style="text-decoration: none; display: inline-block;">
          Browse Today's Headlines →
        </a>
      </div>
    `;
    return;
  }

  container.innerHTML = savedStories.map(story => {
    return `
      <article class="article-card">
        <div class="card-image-box">
          <img src="${story.image}" alt="${window.DailyPlanetUI.escapeHtml(story.title)}" loading="lazy">
          <button class="card-bookmark-btn is-saved" 
                  data-id="${story.id}" 
                  aria-label="Remove from saved">
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
            <span>By ${window.DailyPlanetUI.escapeHtml(story.author.name)}</span>
            <span class="meta-dot">•</span>
            <span>${story.readTime}</span>
          </div>
          <div style="margin-top: 14px; padding-top: 10px; border-top: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center;">
            <a href="article.html?id=${encodeURIComponent(story.id)}" style="font-weight: 700; font-size: 0.85rem; color: var(--accent-color);">Read Story →</a>
            <button class="remove-saved-text-btn" data-id="${story.id}" style="font-size: 0.775rem; color: var(--text-muted); text-decoration: underline;">
              Remove
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Handle individual remove buttons
  container.querySelectorAll('.remove-saved-text-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.getAttribute('data-id');
      window.DailyPlanet.removeBookmark(id);
      window.DailyPlanetUI.showToast('Article removed from your reading list');
    });
  });
}
