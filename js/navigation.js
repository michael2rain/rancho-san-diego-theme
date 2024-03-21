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

/**
 * Intercambiar clases para efecto de sticky header.
 */
const stickyHeader = (header) => {
	if (window.scrollY > 150) {
		header.classList.add("stickyOn");
		header.classList.remove("stickyOff");
	} else if (window.scrollY <= 150) {
		const modalStatus = document.querySelector('body').getAttribute('data-modal-open');
		if (modalStatus === 'true') {
			return;
		};
		header.classList.add("stickyOff");
		header.classList.remove("stickyOn");
	}
}

const initStickyHeader = () => {
	const getHeader = document.getElementById('hrsdHeader');
	!getHeader ? null : (
		stickyHeader(getHeader),
		window.addEventListener('scroll', () => stickyHeader(getHeader))
	);
};

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

/**
 * Mostrar y ocultar botones flotantes
 */
let excuted = false;
const toggleClass = (element) => {
	if (window.scrollY >= window.innerHeight / 3) {
		excuted = true;
		element.classList.add("show-buttons");
		element.classList.remove("hide-buttons");

	} else {
		if (excuted) {
			element.classList.add("hide-buttons");
			element.classList.remove("show-buttons");
		}
	}
};

const scrollButtons = () => {
	let documentHeight = document.documentElement.scrollHeight;
	documentHeight >= 6500 ? documentHeight = 6500 : documentHeight = documentHeight;

	// 5s a que el iframe se cargue
	let chatBubble;
	setTimeout(() => {
		chatBubble = document.getElementById('messengeriframe');
		window.addEventListener('scroll', () => {
			toggleClass(chatBubble);
		});
	}, 3000);

	const floatContainer = document.querySelector('.float-buttons');
	floatContainer.setAttribute('style', `--document-height: ${documentHeight}px;`);

	window.addEventListener('scroll', () => {
		toggleClass(floatContainer);
	});

	const body = document.querySelector('body');
	const menuButton = document.querySelector('div[aria-label="Menu Toggle"]');
	const bookNowButton = document.getElementById('bookNowButton');
	let menuOpen = false;
	let menuExecuted = false;
	menuButton.addEventListener('click', () => {
		if (menuOpen) {
			menuExecuted = true;
			menuOpen = false;

			toggleClass(floatContainer);
			toggleClass(chatBubble);

			bookNowButton.classList.remove("book-now-modal");

			if (body.style.position === 'fixed') {
				const scrollY = document.body.style.top;
				document.body.style.position = '';
				document.body.style.top = '';
				window.scrollTo(0, parseInt(scrollY || '0') * -1);
				body.setAttribute('data-modal-open', 'false');
			}

		} else {
			menuOpen = true;
			bookNowButton.classList.add("book-now-modal");
			if (menuExecuted || window.scrollY >= window.innerHeight / 3) {
				floatContainer.classList.remove("show-buttons");
				floatContainer.classList.add("hide-buttons");

				if (chatBubble) {
					chatBubble.classList.remove("show-buttons");
					chatBubble.classList.add("hide-buttons");
				}
			}

			const statusScrollY = window.scrollY;
			body.style.position = 'fixed';
			body.style.top = `-${statusScrollY}px`;
			body.setAttribute('data-modal-open', 'true');
		}
	});
};

/**
 * Inicializar funciones al cargar el DOM.
 */
document.addEventListener('DOMContentLoaded', () => {
	navDataHover();
	initStickyHeader();
	addLinks();
	scrollButtons();
});