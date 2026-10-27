/**
 * The Daily Planet Newsroom - Theme Management
 * Persists Dark/Light mode in localStorage with zero flicker
 */

(function () {
  const THEME_KEY = 'daily-planet-theme';
  
  // Detect preferred theme
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  // Apply theme to document element immediately
  const currentTheme = getPreferredTheme();
  document.documentElement.setAttribute('data-theme', currentTheme);

  // Expose toggle logic
  window.DailyPlanetTheme = {
    get: () => document.documentElement.getAttribute('data-theme') || 'light',
    set: function (theme) {
      document.documentElement.setAttribute('data-theme', theme);
      try {
        localStorage.setItem(THEME_KEY, theme);
      } catch (e) {
        console.warn('LocalStorage unavailable', e);
      }
      this.updateUI();
    },
    toggle: function () {
      const nextTheme = this.get() === 'dark' ? 'light' : 'dark';
      this.set(nextTheme);
    },
    updateUI: function () {
      const isDark = this.get() === 'dark';
      const toggles = document.querySelectorAll('.theme-toggle-btn');
      
      toggles.forEach(btn => {
        const iconContainer = btn.querySelector('.theme-icon-slot');
        const textLabel = btn.querySelector('.theme-text-label');
        
        if (iconContainer) {
          iconContainer.innerHTML = isDark
            ? `<svg class="theme-icon" viewBox="0 0 24 24"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 000-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36l-1.06 1.06a.996.996 0 000 1.41c.39.39 1.03.39 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41s-1.02-.39-1.41 0z"/></svg>`
            : `<svg class="theme-icon" viewBox="0 0 24 24"><path d="M12.3 2a10 10 0 0 0-.19 14 9.92 9.92 0 0 0 7.9 4 10 10 0 0 0 2-.2 1 1 0 0 0 .8-1.28 1 1 0 0 0-.8-.72 8.13 8.13 0 0 1-5.69-5.69 8.17 8.17 0 0 1 1.7-7.4 1 1 0 0 0-.2-1.61A9.85 9.85 0 0 0 12.3 2z"/></svg>`;
        }
        
        if (textLabel) {
          textLabel.textContent = isDark ? 'Light Mode' : 'Dark Mode';
        }
        btn.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
      });
    }
  };

  // Wire up theme toggles when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    window.DailyPlanetTheme.updateUI();
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.DailyPlanetTheme.toggle();
      });
    });
  });
})();
