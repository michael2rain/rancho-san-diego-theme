/**
 * Isoptope Init
 */

const isotopeInit = () => {
    // Obtener los términos de la taxonomía incluidas con wp_localize_script
    const terms = window.publicTerms.names;

    const filterContainer = document.getElementById('filterContainer');
    let filterList = filterContainer.querySelector('ul');
    let filterItem = filterContainer.querySelector('li');
    filterItem.setAttribute('data-filter', '');

    // Agregar botones de filtro
    terms.map((term) => {
        for (let i = 0; i < terms.length - 1; i++) {
            let clone = filterList.appendChild(filterItem.cloneNode(true));
            clone.childNodes[1].innerText = term;
            clone.setAttribute('data-filter', `.${term}`);
        }
    });

    // Activar botones de filtro
    let filterTarget;
    const filterActivateButtons = (target) => {
        if (filterTarget) {
            if (filterTarget != target) {
                filterTarget.classList.remove('active');
            }
        }
        filterTarget = target;
        filterTarget.classList.add('active');
    };

    // Añadir clases necesarias para Isotope
    const itemsContainer = document.querySelectorAll('#instalationsGrid');
    const grid = itemsContainer[0].querySelectorAll('.elementor-grid');
    grid[0].classList.add('iso-grid');

    const allItems = document.querySelectorAll('div[data-elementor-type="loop-item"]');
    allItems.forEach((_, i) => {
        const allItemsChild = allItems[i].childNodes[1].getAttribute('data-term');
        const itemTerm = allItemsChild.replace(/<[^>]*>?/gm, '');
        allItems[i].classList.add(`${itemTerm}`);
        allItems[i].classList.add('iso-item');
    });

    // Inicializar Isotope
    const isotope = new Isotope('.iso-grid', {
        itemSelector: '.iso-item',
        layoutMode: 'fitRows',
        fitRows: {
            gutter: 30,
        },
    });

    const buttons = filterContainer.querySelectorAll('.elementor-inline-item');
    buttons[0].childNodes[1].classList.add('active');
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            buttons[0].childNodes[1].classList.remove('active');
            filterActivateButtons(e.target);

            let isoFilters = e.target.parentNode.getAttribute('data-filter');

            isotope.arrange({ filter: isoFilters });
        });
    });
};
document.addEventListener('DOMContentLoaded', isotopeInit);