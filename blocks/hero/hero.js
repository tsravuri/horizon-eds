export default function decorate(block) {
  document.body.style.overflowY = '';
  document.documentElement.style.overflowY = '';

  const section = block.closest('.section');
  if (section) {
    section.classList.add('hero-section');
  }

  const values = [...block.children]
    .map((row) => row.textContent.trim())
    .filter(Boolean);

  const [title = '', subtitle = '', placeholder = 'What can I help you find?'] = values;
  const backgroundVideoSrc = 'https://www.pearson.com/content/dam/global/shared/brand/evolution/video/waves-fucsia-3-pearsonpurple-slow-16x9-l2r/waves-fucsia-3-pearsonpurple-slow-16x9-l2r-hires-v01.mp4';

  block.innerHTML = `
    <div class="hero-media" aria-hidden="true">
      <video autoplay muted loop playsinline preload="metadata">
        <source src="${backgroundVideoSrc}" type="video/mp4" />
      </video>
      <div class="hero-overlay"></div>
    </div>
    <div class="hero-shell">
      <div class="hero-topbar">
        <div class="hero-brand-links">
          <a class="hero-logo" href="/" aria-label="Pearson home">
            <img src="/icons/logo-full-white.svg" alt="Pearson" width="164" height="31" loading="eager" />
          </a>
          <a href="/">By Customer</a>
          <a href="/">For Education</a>
          <a href="/">For Work</a>
        </div>
        <div class="hero-tools-links">
          <a href="/">Contact Sales</a>
          <a href="/">Get Support</a>
          <a href="/">Sign In</a>
          <a href="/">Cart</a>
          <a href="/">Locale</a>
        </div>
      </div>
      <div class="hero-content">
        <h1>${title}</h1>
        <p>${subtitle}</p>
        <div class="hero-search">
          <input type="text" placeholder="${placeholder}" aria-label="Search" />
        </div>
      </div>
    </div>
  `;
}
