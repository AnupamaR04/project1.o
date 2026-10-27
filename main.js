/**
 * The Daily Planet Newsroom - Main JavaScript
 * Handles Theme Toggling, Date Auto-generation, Sticky Nav,
 * Mobile Navigation Drawer, Live Search Modal, Newsletter, and Global Bookmarks.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initAutoDate();
  initMobileNav();
  initBookmarkBadge();
  initLiveSearch();
  initNewsletter();
  initGlobalBookmarkListeners();
});

/**
 * Detect current folder depth to build proper relative paths
 * e.g., if inside /pages/, links to home need '../index.html' and links to articles need 'article.html?id=...'
 */
function getPathPrefix() {
  const isPageSubdir = window.location.pathname.includes('/pages/') || 
                       window.location.pathname.includes('\\pages\\');
  return isPageSubdir ? '../' : '';
}

function getPagesPrefix() {
  const isPageSubdir = window.location.pathname.includes('/pages/') || 
                       window.location.pathname.includes('\\pages\\');
  return isPageSubdir ? '' : 'pages/';
}

// -------------------------------------------------------------
// 1. THEME CONTROLLER (Light / Dark Mode with Persistence)
// -------------------------------------------------------------
function initTheme() {
  const THEME_KEY = 'daily_planet_theme';
  const savedTheme = localStorage.getItem(THEME_KEY);
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  applyTheme(currentTheme);

  const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem(THEME_KEY, newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} editorial mode`);
    });
  });
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }

  // Update button icons/text if present
  const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
  toggleBtns.forEach(btn => {
    const isDark = theme === 'dark';
    const labelSpan = btn.querySelector('.theme-label');
    const iconSpan = btn.querySelector('.theme-icon');
    
    if (labelSpan) {
      labelSpan.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    }
    if (iconSpan) {
      iconSpan.textContent = isDark ? '☀️' : '🌙';
    }
    btn.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
  });
}

// -------------------------------------------------------------
// 2. AUTO-GENERATED TODAY'S DATE
// -------------------------------------------------------------
function initAutoDate() {
  const dateElements = document.querySelectorAll('.today-date');
  if (!dateElements.length) return;

  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);

  dateElements.forEach(el => {
    el.textContent = formattedDate;
  });
}

// -------------------------------------------------------------
// 3. MOBILE NAVIGATION DRAWER
// -------------------------------------------------------------
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  if (!toggleBtn || !drawer) return;

  function openDrawer() {
    toggleBtn.classList.add('is-open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    toggleBtn.classList.remove('is-open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('is-open');
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  // Close when clicking outside panel or on link
  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) {
      closeDrawer();
    }
  });

  const drawerLinks = drawer.querySelectorAll('a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });
}

// -------------------------------------------------------------
// 4. BOOKMARK BADGE COUNTER & SYNC
// -------------------------------------------------------------
function initBookmarkBadge() {
  updateBookmarkBadges();

  window.addEventListener('bookmarksUpdated', () => {
    updateBookmarkBadges();
  });
}

function updateBookmarkBadges() {
  if (!window.DailyPlanet) return;
  const count = window.DailyPlanet.getSavedBookmarks().length;
  const badges = document.querySelectorAll('.saved-count-badge');
  badges.forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline-flex' : 'none';
  });
}

// Global click delegation for bookmark buttons
function initGlobalBookmarkListeners() {
  document.addEventListener('click', (e) => {
    const bookmarkBtn = e.target.closest('.card-bookmark-btn, .action-bookmark-btn');
    if (!bookmarkBtn) return;

    e.preventDefault();
    e.stopPropagation();

    const articleId = bookmarkBtn.getAttribute('data-id');
    if (!articleId || !window.DailyPlanet) return;

    const isNowSaved = window.DailyPlanet.toggleBookmark(articleId);
    
    // Update button visual state
    bookmarkBtn.classList.toggle('is-saved', isNowSaved);
    bookmarkBtn.setAttribute('aria-label', isNowSaved ? 'Remove from saved' : 'Save article');
    
    // If inside article reader, update button text
    const label = bookmarkBtn.querySelector('.btn-text');
    if (label) {
      label.textContent = isNowSaved ? 'Saved' : 'Save';
    }

    showToast(isNowSaved ? 'Article saved to your reading list' : 'Article removed from saved');
  });
}

// -------------------------------------------------------------
// 5. LIVE SEARCH MODAL WITH REAL-TIME RESULTS
// -------------------------------------------------------------
function initLiveSearch() {
  const triggerBtns = document.querySelectorAll('.search-trigger-btn');
  const modal = document.querySelector('.search-modal-backdrop');
  if (!modal) return;

  const searchInput = modal.querySelector('.search-input-field');
  const closeBtn = modal.querySelector('.search-close-btn');
  const resultsContainer = modal.querySelector('.search-results-area');

  function openSearch() {
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      searchInput?.focus();
    }, 100);
  }

  function closeSearch() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    if (searchInput) searchInput.value = '';
    if (resultsContainer) {
      resultsContainer.innerHTML = '<p class="search-hint">Type any keyword, title, author, or topic to search...</p>';
    }
  }

  triggerBtns.forEach(btn => btn.addEventListener('click', openSearch));
  closeBtn?.addEventListener('click', closeSearch);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeSearch();
  });

  // Keyboard shortcut '/' opens search, 'Escape' closes
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeSearch();
    } else if (e.key === '/' && !modal.classList.contains('is-open') && 
               document.activeElement.tagName !== 'INPUT' && 
               document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      openSearch();
    }
  });

  // Debounced live search
  let debounceTimer = null;
  searchInput?.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    const query = e.target.value.trim();

    if (!query) {
      resultsContainer.innerHTML = '<p class="search-hint">Type any keyword, title, author, or topic to search...</p>';
      return;
    }

    debounceTimer = setTimeout(async () => {
      if (!window.DailyPlanet) return;
      const results = await window.DailyPlanet.searchArticles(query);
      renderSearchResults(results, query, resultsContainer);
    }, 180);
  });
}

function renderSearchResults(results, query, container) {
  if (!results.length) {
    container.innerHTML = `
      <div class="empty-state-box" style="padding: 24px; border: none;">
        <p class="empty-state-title" style="font-size: 1.15rem;">No results found for "${escapeHtml(query)}"</p>
        <p class="empty-state-desc" style="font-size: 0.85rem;">Try searching for "Wi-Fi", "drone", "football", "AI", or "art".</p>
      </div>
    `;
    return;
  }

  const pagesPrefix = getPagesPrefix();
  const html = results.map(article => {
    return `
      <a href="${pagesPrefix}article.html?id=${encodeURIComponent(article.id)}" class="search-result-card">
        <img src="${article.image}" alt="${escapeHtml(article.title)}" class="search-result-thumb" loading="lazy">
        <div class="search-result-info">
          <span class="search-result-eyebrow">${escapeHtml(article.category)}</span>
          <h4 class="search-result-title">${highlightMatch(article.title, query)}</h4>
          <div class="search-result-meta">By ${escapeHtml(article.author.name)} · ${article.readTime}</div>
        </div>
      </a>
    `;
  }).join('');

  container.innerHTML = html;
}

function highlightMatch(text, query) {
  if (!query) return escapeHtml(text);
  const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
  return escapeHtml(text).replace(regex, '<mark style="background: var(--accent-subtle); color: var(--accent-color); font-weight: bold; padding: 0 2px;">$1</mark>');
}

// -------------------------------------------------------------
// 6. NEWSLETTER SUBSCRIPTION HANDLER
// -------------------------------------------------------------
function initNewsletter() {
  const forms = document.querySelectorAll('.newsletter-form');
  const STORAGE_KEY = 'daily_planet_newsletter';

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      const msgBox = form.closest('.newsletter-banner')?.querySelector('.newsletter-msg') || 
                     form.parentElement.querySelector('.newsletter-msg');
      
      const email = input?.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !emailRegex.test(email)) {
        if (msgBox) {
          msgBox.className = 'newsletter-msg is-error';
          msgBox.textContent = 'Please enter a valid campus or personal email address.';
        }
        return;
      }

      // Save to localStorage
      try {
        const subs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        if (!subs.includes(email)) {
          subs.push(email);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(subs));
        }
      } catch (err) {
        console.error(err);
      }

      if (input) input.value = '';
      if (msgBox) {
        msgBox.className = 'newsletter-msg is-success';
        msgBox.textContent = '✓ Welcome to The Daily Dispatch! Check your inbox tomorrow morning for campus headlines.';
      }
      showToast('Subscribed to The Daily Dispatch!');
    });
  });
}

// -------------------------------------------------------------
// 7. TOAST NOTIFICATION HELPER
// -------------------------------------------------------------
let toastTimer = null;
function showToast(message) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('is-visible');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 2800);
}

// Utilities
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Export helpers to global scope
window.DailyPlanetUI = {
  showToast,
  escapeHtml,
  getPathPrefix,
  getPagesPrefix
};
