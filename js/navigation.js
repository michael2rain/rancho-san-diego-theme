/**
 * Agregar atributo "data-hover" a los enlaces del menú principal.
 */
const navDataHover = () => {
	const navMenu = document.getElementById('hrsdMenu').querySelectorAll('.elementor-nav-menu');
	if (!navMenu.length) {
		return;
	}
	const navItems = navMenu[0].querySelectorAll('.menu-item');
	for (const item of navItems) {
		const link = item.querySelector('a');
		link.setAttribute('data-hover', link.textContent);
	}
};
document.addEventListener('DOMContentLoaded', navDataHover)

/**
 * Intercambiar clases para efecto de sticky header.
 */
const stickyHeader = (header) => {
	if (window.scrollY > 150) {
		header.classList.add("stickyOn");
		header.classList.remove("stickyOff");
	} else {
		header.classList.add("stickyOff");
		header.classList.remove("stickyOn");
	}
}
document.addEventListener('DOMContentLoaded', () => {
	const getHeader = document.getElementById('hrsdHeader');
	!getHeader ? null : (
		stickyHeader(getHeader),
		window.addEventListener('scroll', () => stickyHeader(getHeader))
	);
});