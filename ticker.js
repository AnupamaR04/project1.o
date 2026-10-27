/**
 * The Daily Planet Newsroom - Breaking News Ticker
 * Dynamically loads breaking stories and controls continuous smooth auto-scroll.
 */

document.addEventListener('DOMContentLoaded', async () => {
  await initBreakingTicker();
});

async function initBreakingTicker() {
  const tickerTrack = document.querySelector('.ticker-track');
  if (!tickerTrack || !window.DailyPlanet) return;

  try {
    const breakingStories = await window.DailyPlanet.getBreakingArticles();
    if (!breakingStories.length) {
      // Fallback to top 3 newest articles if none marked breaking
      const all = await window.DailyPlanet.getArticles();
      renderTickerItems(all.slice(0, 4), tickerTrack);
    } else {
      renderTickerItems(breakingStories, tickerTrack);
    }

    initTickerButtons();
  } catch (err) {
    console.error('Failed to initialize breaking ticker:', err);
  }
}

function renderTickerItems(stories, container) {
  const pagesPrefix = window.DailyPlanetUI ? window.DailyPlanetUI.getPagesPrefix() : 'pages/';

  const storyHtml = stories.map(story => {
    return `
      <a href="${pagesPrefix}article.html?id=${encodeURIComponent(story.id)}" class="ticker-item">
        <strong>${window.DailyPlanetUI.escapeHtml(story.category)}:</strong>
        <span>${window.DailyPlanetUI.escapeHtml(story.title)}</span>
        <span class="ticker-item-separator">•</span>
      </a>
    `;
  }).join('');

  // Duplicate items twice to ensure smooth, gap-free infinite CSS marquee animation
  container.innerHTML = storyHtml + storyHtml;
}

function initTickerButtons() {
  const prevBtn = document.querySelector('.ticker-prev-btn');
  const nextBtn = document.querySelector('.ticker-next-btn');
  const track = document.querySelector('.ticker-track');
  if (!prevBtn || !nextBtn || !track) return;

  // Clicking next/prev nudges scroll manually
  let offset = 0;
  const step = 260;

  prevBtn.addEventListener('click', () => {
    track.style.animationPlayState = 'paused';
    offset += step;
    track.style.transform = `translateX(${offset}px)`;
  });

  nextBtn.addEventListener('click', () => {
    track.style.animationPlayState = 'paused';
    offset -= step;
    track.style.transform = `translateX(${offset}px)`;
  });
}
