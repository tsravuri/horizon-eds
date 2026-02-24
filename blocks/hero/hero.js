export default function decorate(block) {
  const values = [...block.children]
    .map((row) => row.textContent.trim())
    .filter(Boolean);

  const [title = '', subtitle = '', placeholder = 'What can I help you find?'] = values;

  block.innerHTML = `
    <div class="hero-content">
      <h1>${title}</h1>
      <p>${subtitle}</p>
      <div class="hero-search">
        <input type="text" placeholder="${placeholder}" aria-label="Search" />
      </div>
    </div>
  `;
}
