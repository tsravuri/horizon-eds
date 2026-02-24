export default function decorate(block) {
  document.body.style.overflowY = '';
  document.documentElement.style.overflowY = '';
  document.body.classList.add('has-custom-hero');

  const section = block.closest('.section');
  if (section) {
    section.classList.add('hero-section');
  }

  const values = [...block.children]
    .map((row) => row.textContent.trim())
    .filter(Boolean);

  const [title = '', subtitle = '', placeholder = 'What can I help you find?'] = values;
  const backgroundVideoSrc = 'https://www.pearson.com/content/dam/global/shared/brand/evolution/video/waves-fucsia-3-pearsonpurple-slow-16x9-l2r/waves-fucsia-3-pearsonpurple-slow-16x9-l2r-hires-v01.mp4';
  const heroDropdowns = [
    {
      label: 'By Customer',
      items: ['Institution', 'Enterprise', 'Consumer'],
    },
    {
      label: 'For Education',
      items: ['Learn', 'Progress', 'Career Readiness', 'Whole Learner', 'Educator Excellence'],
    },
    {
      label: 'For Work',
      items: ['Talent Solutions', 'Professional Assessments', 'Clinical'],
    },
  ];
  const dropdownMarkup = heroDropdowns
    .map((dropdown) => {
      const menuItems = dropdown.items
        .map((item) => `<li><a href="/">${item}</a></li>`)
        .join('');
      return `<div class="hero-nav-item has-dropdown">
        <button type="button" class="hero-nav-trigger" aria-expanded="false" aria-haspopup="true">
          ${dropdown.label}
          <span class="hero-nav-arrow" aria-hidden="true"></span>
        </button>
        <ul class="hero-nav-menu" hidden>
          ${menuItems}
        </ul>
      </div>`;
    })
    .join('');

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
          ${dropdownMarkup}
        </div>
        <div class="hero-tools-links">
          <a class="hero-tool hero-tool-sales" href="/">Contact Sales</a>
          <a class="hero-tool" href="/">Get Support</a>
          <a class="hero-tool" href="/">Sign In</a>
          <a class="hero-tool hero-tool-icon" href="/" aria-label="Cart">🛒</a>
          <a class="hero-tool hero-tool-icon" href="/" aria-label="Locale">🌐</a>
        </div>
      </div>
      <div class="hero-content">
        <h1>${title}</h1>
        <p>${subtitle}</p>
        <div class="hero-search">
          <input type="text" placeholder="${placeholder}" aria-label="Search" />
          <button type="button" aria-label="Submit search">
            <img src="/icons/search.svg" alt="" width="18" height="18" loading="lazy" />
          </button>
        </div>
      </div>
    </div>
  `;

  const dropdownItems = [...block.querySelectorAll('.hero-nav-item.has-dropdown')];

  const closeDropdown = (dropdown) => {
    const trigger = dropdown.querySelector('.hero-nav-trigger');
    const menu = dropdown.querySelector('.hero-nav-menu');
    trigger.setAttribute('aria-expanded', 'false');
    menu.hidden = true;
  };

  const closeAllDropdowns = (except = null) => {
    dropdownItems.forEach((dropdown) => {
      if (dropdown !== except) {
        closeDropdown(dropdown);
      }
    });
  };

  dropdownItems.forEach((dropdown) => {
    const trigger = dropdown.querySelector('.hero-nav-trigger');
    const menu = dropdown.querySelector('.hero-nav-menu');

    trigger.addEventListener('click', (event) => {
      event.stopPropagation();
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      closeAllDropdowns(dropdown);
      trigger.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
      menu.hidden = isExpanded;
    });

    dropdown.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeDropdown(dropdown);
        trigger.focus();
      }
    });
  });

  document.addEventListener('click', (event) => {
    if (!block.contains(event.target)) {
      closeAllDropdowns();
    }
  });
}
