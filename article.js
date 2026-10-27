/**
 * The Daily Planet Newsroom - Article View Controller
 * Handles article detail rendering, Reading Progress Bar,
 * Interactive Like Counter, Local Comments, and Related Stories.
 */

document.addEventListener('DOMContentLoaded', async () => {
  if (!document.getElementById('article-content-container')) return;
  await initArticlePage();
  initReadingProgressBar();
});

let currentArticle = null;

async function initArticlePage() {
  if (!window.DailyPlanet) return;

  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get('id') || 'turing-hall-quantum-ai-lab';

  try {
    currentArticle = await window.DailyPlanet.getArticleById(articleId);
    if (!currentArticle) {
      // Fallback to first available
      const all = await window.DailyPlanet.getArticles();
      currentArticle = all[0];
    }

    // Update document title
    document.title = `${currentArticle.title} - The Daily Planet`;

    renderArticleDetail();
    renderRelatedStories();
    initArticleLikes();
    initCommentForm();
  } catch (err) {
    console.error('Failed to load article detail:', err);
  }
}

/**
 * 1. Reading Progress Bar
 */
function initReadingProgressBar() {
  const progressBar = document.querySelector('.reading-progress-bar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  }, { passive: true });
}

/**
 * 2. Render Full Article Detail
 */
function renderArticleDetail() {
  const container = document.getElementById('article-content-container');
  if (!container || !currentArticle) return;

  const isSaved = window.DailyPlanet.isArticleSaved(currentArticle.id);

  // Category breadcrumb link
  const categoryUrl = `${currentArticle.categorySlug}.html`;

  const tagsHtml = currentArticle.tags ? currentArticle.tags.map(tag => {
    return `<span class="article-tag-pill">#${window.DailyPlanetUI.escapeHtml(tag)}</span>`;
  }).join('') : '';

  const bodyHtml = currentArticle.content ? currentArticle.content.join('\n') : `<p class="lead">${currentArticle.summary}</p>`;

  container.innerHTML = `
    <!-- Breadcrumbs -->
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="../index.html">Home</a>
      <span class="breadcrumb-separator">›</span>
      <a href="${categoryUrl}">${window.DailyPlanetUI.escapeHtml(currentArticle.category)}</a>
      <span class="breadcrumb-separator">›</span>
      <span aria-current="page" style="color: var(--text-primary); font-weight: 500;">Story</span>
    </nav>

    <!-- Header & Headline -->
    <header class="article-header">
      <a href="${categoryUrl}" class="article-category-badge">${window.DailyPlanetUI.escapeHtml(currentArticle.category)}</a>
      <h1 class="article-headline">${window.DailyPlanetUI.escapeHtml(currentArticle.title)}</h1>
      <p class="article-subtitle">${window.DailyPlanetUI.escapeHtml(currentArticle.subtitle)}</p>

      <div class="article-byline-bar">
        <div class="author-info-box">
          <img src="${currentArticle.author.avatar}" alt="${window.DailyPlanetUI.escapeHtml(currentArticle.author.name)}" class="author-avatar-lg">
          <div>
            <div class="author-name">By ${window.DailyPlanetUI.escapeHtml(currentArticle.author.name)}</div>
            <div class="author-role">${window.DailyPlanetUI.escapeHtml(currentArticle.author.role)}</div>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
          <div class="article-timing">
            <span>📅 ${currentArticle.date}</span>
            <span class="meta-dot">•</span>
            <span>⏱️ ${currentArticle.readTime}</span>
          </div>

          <div class="article-actions-group">
            <button class="action-btn action-bookmark-btn ${isSaved ? 'is-saved' : ''}" 
                    data-id="${currentArticle.id}" 
                    aria-label="${isSaved ? 'Remove from saved' : 'Save article'}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
              <span class="btn-text">${isSaved ? 'Saved' : 'Save'}</span>
            </button>

            <button class="action-btn copy-link-btn" title="Copy article link">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Hero Image -->
    <figure class="article-hero-figure">
      <img src="${currentArticle.image}" alt="${window.DailyPlanetUI.escapeHtml(currentArticle.title)}" class="article-hero-image">
      <figcaption class="article-hero-caption">
        📷 ${window.DailyPlanetUI.escapeHtml(currentArticle.imageCaption || currentArticle.title)}
      </figcaption>
    </figure>

    <!-- Rich Body Content -->
    <div class="article-body-content">
      ${bodyHtml}
    </div>

    <!-- Tags -->
    <div class="article-tags-wrap">
      <span style="font-weight: 700; font-size: 0.85rem; margin-right: 4px;">Topics:</span>
      ${tagsHtml}
    </div>

    <!-- Interaction Strip: Like & Comments Jump -->
    <div class="article-interaction-strip">
      <button class="like-button-large" id="article-like-btn">
        <svg class="like-heart-icon" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        <span class="like-text">Like Story</span>
        <span class="like-count" id="article-like-count">0</span>
      </button>

      <a href="#comments-section" class="action-btn" style="text-decoration: none;">
        💬 Jump to Campus Discussion
      </a>
    </div>
  `;

  // Attach copy link handler
  const copyBtn = container.querySelector('.copy-link-btn');
  copyBtn?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      window.DailyPlanetUI.showToast('Article link copied to clipboard!');
    } catch (e) {
      window.DailyPlanetUI.showToast('Article URL: ' + window.location.href);
    }
  });
}

/**
 * 3. Interactive Like Counter (localStorage)
 */
function initArticleLikes() {
  const likeBtn = document.getElementById('article-like-btn');
  const countSpan = document.getElementById('article-like-count');
  if (!likeBtn || !countSpan || !currentArticle) return;

  const initialLikes = currentArticle.likes || 42;
  const state = window.DailyPlanet.getArticleLikes(currentArticle.id, initialLikes);

  updateLikeUI(state.count, state.userLiked);

  likeBtn.addEventListener('click', () => {
    const updated = window.DailyPlanet.toggleArticleLike(currentArticle.id, initialLikes);
    updateLikeUI(updated.count, updated.userLiked);
    window.DailyPlanetUI.showToast(updated.userLiked ? 'You liked this story' : 'Like removed');
  });

  function updateLikeUI(count, isLiked) {
    countSpan.textContent = count.toLocaleString();
    likeBtn.classList.toggle('is-liked', isLiked);
    const textSpan = likeBtn.querySelector('.like-text');
    if (textSpan) textSpan.textContent = isLiked ? 'Liked' : 'Like Story';
  }
}

/**
 * 4. Comments Form & List (localStorage + seeded)
 */
function initCommentForm() {
  const commentsList = document.getElementById('comments-list-container');
  const commentForm = document.getElementById('campus-comment-form');
  if (!commentsList || !commentForm || !currentArticle) return;

  renderCommentsList();

  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('comment-author-name');
    const roleInput = document.getElementById('comment-author-role');
    const textInput = document.getElementById('comment-body-text');

    const name = nameInput.value.trim();
    const role = roleInput.value.trim();
    const text = textInput.value.trim();

    if (!name || !text) {
      window.DailyPlanetUI.showToast('Please fill out your name and comment.');
      return;
    }

    const newComment = window.DailyPlanet.addArticleComment(currentArticle.id, name, role, text);
    if (newComment) {
      textInput.value = '';
      renderCommentsList();
      window.DailyPlanetUI.showToast('Your comment was posted to the discussion.');
    }
  });

  function renderCommentsList() {
    const comments = window.DailyPlanet.getArticleComments(currentArticle.id);
    const countEl = document.getElementById('comments-count-badge');
    if (countEl) countEl.textContent = `(${comments.length})`;

    if (!comments.length) {
      commentsList.innerHTML = `<p style="color: var(--text-muted); font-style: italic;">No comments yet. Be the first student to share your thoughts!</p>`;
      return;
    }

    commentsList.innerHTML = comments.map(c => {
      return `
        <div class="comment-card">
          <div class="comment-card-header">
            <span class="comment-card-author">${window.DailyPlanetUI.escapeHtml(c.author)}</span>
            <span class="comment-card-time">${window.DailyPlanetUI.escapeHtml(c.time)}</span>
          </div>
          <p class="comment-card-text">${window.DailyPlanetUI.escapeHtml(c.text)}</p>
        </div>
      `;
    }).reverse().join('');
  }
}

/**
 * 5. Render Related Stories (3 cards)
 */
async function renderRelatedStories() {
  const container = document.getElementById('related-stories-grid');
  if (!container || !currentArticle) return;

  const all = await window.DailyPlanet.getArticles();
  // Filter stories from same category, excluding current
  let related = all.filter(a => a.id !== currentArticle.id && a.categorySlug === currentArticle.categorySlug);

  // If not enough from same category, supplement from other categories
  if (related.length < 3) {
    const others = all.filter(a => a.id !== currentArticle.id && a.categorySlug !== currentArticle.categorySlug);
    related = [...related, ...others].slice(0, 3);
  } else {
    related = related.slice(0, 3);
  }

  container.innerHTML = related.map(story => {
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
          <h3 class="card-title" style="font-size: 1.1rem;">
            <a href="article.html?id=${encodeURIComponent(story.id)}">${window.DailyPlanetUI.escapeHtml(story.title)}</a>
          </h3>
          <div class="card-meta">
            <span>By ${window.DailyPlanetUI.escapeHtml(story.author.name)}</span>
            <span class="meta-dot">•</span>
            <span>${story.readTime}</span>
          </div>
        </div>
      </article>
    `;
  }).join('');
}
