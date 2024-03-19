/**
 * @file spa-filter.js
 * @description: Filtro de servicios en página de Spa
 */

let filterTarget;
const activateButton = (target) => {
    if (filterTarget) {
        if (filterTarget != target) {
            filterTarget.classList.remove('active-category');
        }
    }
    filterTarget = target;
    filterTarget.classList.add('active-category');
};

const filter = (target) => {
    let activeServiceCount = 0;
    const attributeName = 'data-service-number'

    const services = document.querySelectorAll('div[data-elementor-type="loop-item"]')
    services.forEach((service) => {
        const serviceContainer = service.childNodes[1];
        const getTerms = serviceContainer.getAttribute('data-category');
        const term = getTerms.replace(/<[^>]*>?/gm, '');

        if (term === target.textContent) {
            service.style.display = 'block';
            service.classList.add('active-service-item');
            activeServiceCount++;
            const formattedNumber = activeServiceCount.toString().padStart(2, '0');
            serviceContainer.setAttribute(attributeName, formattedNumber);
        } else {
            service.style.display = 'none';
            service.classList.remove('active-service-item');
            serviceContainer.removeAttribute(attributeName);
        }
    })
};

const mobileSelector = (container, categories, title, description) => {
    const select = document.createElement("select");
    select.classList.add("category-select");
    const selectLabel = document.getElementById("spaListHeading");
    select.setAttribute("aria-label", selectLabel.getAttribute("data-translate-selector"));

    categories.forEach((category) => {

        if (category.dataset.categoryDesc === undefined) {
            category.dataset.categoryDesc = "";
        };

        const option = document.createElement("option");
        option.value = category.textContent;
        option.textContent = category.textContent;
        option.dataset.categoryDesc = category.dataset.categoryDesc;
        select.appendChild(option);
    });

    select.addEventListener("change", (e) => {
        const optionSelected = e.target.options[e.target.selectedIndex];
        title.textContent = optionSelected.textContent;
        description.textContent = optionSelected.dataset.categoryDesc;
        filter(optionSelected);
    });

    container.appendChild(select);
};

const initCategoryFilter = () => {
    const catList = document.getElementById("catServicesList");
    if (!catList) {
        return;
    }

    const parent = catList.parentElement;
    const container = document.createElement("section");
    const title = document.createElement("h2");
    const description = document.createElement("p");

    container.classList.add("container-description");
    title.classList.add("category-title");
    description.classList.add("category-description");

    parent.appendChild(container);
    container.appendChild(title);
    container.appendChild(description);

    const categories = catList.querySelectorAll("li");
    categories[0].classList.add("active-category");
    title.textContent = categories[0].textContent;
    description.textContent = categories[0].dataset.categoryDesc;

    filter(categories[0]);

    if (window.innerWidth <= 768) {
        mobileSelector(parent, categories, title, description);
    }

    categories.forEach((category) => {
        let desc = category.dataset.categoryDesc;
        if (!desc) {
            desc = "";
        }

        category.addEventListener("click", (e) => {
            categories[0].classList.remove("active-category");
            activateButton(e.target);

            desc = e.target.dataset.categoryDesc;
            title.textContent = e.target.textContent;
            description.textContent = desc;

            filter(e.target);
        });
    });
};

window.addEventListener("DOMContentLoaded", initCategoryFilter);