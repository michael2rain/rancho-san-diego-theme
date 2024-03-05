const initFilter = () => {

    // Obtener los términos de la taxonomía incluidas con wp_localize_script
    const terms = window.publicTerms.names;

    const filterContainer = document.getElementById('filterContainer');
    let filterList = filterContainer.querySelector('ul');
    let filterItem = filterContainer.querySelector('li');
    filterItem.setAttribute('data-term', 'all');

    // Agregar botones de filtro
    terms.map((term) => {
        for (let i = 0; i < terms.length - 1; i++) {
            let clone = filterList.appendChild(filterItem.cloneNode(true));
            clone.childNodes[1].innerText = term;
            clone.setAttribute('data-term', term);
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

    // Filtrar los elementos
    const filters = filterContainer.querySelectorAll('.elementor-inline-item');
    filters[0].childNodes[1].classList.add('active');

    for (let i = 0; i < filters.length; i++) {
        filters[i].addEventListener('click', (e) => {

            filters[0].childNodes[1].classList.remove('active');
            filterActivateButtons(e.target);

            const term = e.target.parentNode.getAttribute('data-term');
            const allItems = document.querySelectorAll('div[data-elementor-type="loop-item"]');

            for (let i = 0; i < allItems.length; i++) {
                const allItemsChild = allItems[i].childNodes[1].getAttribute('data-term');
                // limpiar data term "<span></span>"
                const itemTerm = allItemsChild.replace(/<[^>]*>?/gm, '');

                if (term === 'all') {
                    allItems[i].classList.remove('item-fade-out');
                    allItems[i].classList.add('item-fade-in');
                } else {
                    if (itemTerm === term) {
                        allItems[i].classList.add('item-fade-in');
                        allItems[i].classList.add('item-fade-out');

                    } else {
                        allItems[i].classList.remove('item-fade-in');
                        allItems[i].classList.add('item-fade-out');
                    }
                }
            }
        });
    }

};
document.addEventListener('DOMContentLoaded', initFilter);

console.log('%c04 DE MARZO', 'color: orange; font-size: 20px; font-weight: bold;')