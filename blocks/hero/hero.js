export default function decorate(block) {
  const placeholder = block.textContent.trim();
  block.innerHTML = `
    <input type="text" placeholder="${placeholder}" />
 `;
}
