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


/**
 * Asignar enlaces a las tarjetas de habitaciones y al botón de "Reservar ahora".
 */
const addLinks = () => {
	const now = new Date();
	const checkInDate = now.toISOString().split("T")[0];
	const checkOutDate = new Date(now.setDate(now.getDate() + 1)).toISOString().split("T")[0];
	const localeData = {
		'en-US': {
			currency: 'USD',
			lang: 'en'
		},
		'es-MX': {
			currency: 'MXN',
			lang: 'es'
		}
	};

	let locale;
	if (localeData[document.documentElement.lang]) {
		locale = localeData[document.documentElement.lang];
	}

	const domainBase = "https://direct-book.com/properties/HotelRanchoSanDiegoDIRECT";
	const params = `?locale=${locale.lang}&items[0][adults]=2&items[0][children]=0&items[0][infants]=0&currency=${locale.currency}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&trackPage=yes`;

	const rooms = document.querySelectorAll('.item__card');
	if (rooms) {
		rooms.forEach((room) => {
			room.setAttribute('href', `${domainBase}${params}`);
		});
	}

	const bookNowButton = document.getElementById('bookNowButton');
	if (bookNowButton) {
		const bookNowLink = bookNowButton.querySelector('a');
		bookNowLink.setAttribute('href', `${domainBase}${params}`);
	}

};
document.addEventListener('DOMContentLoaded', addLinks)