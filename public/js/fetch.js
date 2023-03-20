fetch.js
const carousel = document.querySelector(".carousel");

let name = document.querySelector("[data-id=name]");
let brand = document.querySelector("[data-id=brand]");
let color = document.querySelector("[data-id=color]");
let price = document.querySelector("[data-id=price]");
let category = document.querySelector("[data-id=category]");
let disponibility = document.querySelector("[data-id=disponibility]");
let image = document.querySelector("[data-id=image]");

const searchBtn = document.querySelector("[data-id=search-button]");
const searchInput= document.querySelector("[data-id=search-input]");

const categoryFilter = document.querySelector("[data-filter=category]");
const brandFilter = document.querySelector("[data-filter=brand]");
const colorFilter = document.querySelector("[data-filter=color]");
const radioButtons = document.querySelectorAll("[data-radio=disponibility]");


const applyBtn = document.querySelector(".apply-filters");
const filterModal = document.querySelector(".filter");
const filterBtn = document.querySelector(".filter-btn");
const filters = {
    brand: [],
    category: [],
    color: [],
    disponibility: "Tudo"
}




let data;


(async () => { 
    data = await fetchData();
    
    const randomNum = Math.floor(Math.random() * (data.length + 1));
    
    name.innerText = data[randomNum].name;
    brand.innerText = data[randomNum].brand;
    color.innerText = data[randomNum].color;
    price.innerText = data[randomNum].price;
    category.innerText = data[randomNum].category;
    category.innerText = data[randomNum].category;
    disponibility.innerText = data[randomNum].stock > 0 ? "Disponivel!" : "Indisponivel!";
    image.src = "img/" + data[randomNum].brand.toLowerCase() + ".png";

    let categories = [];
    let brands = [];
    let colors = [];

    data.forEach((item, index) => {     
        carousel.innerHTML += `
            <div class="item">
                <p><span class="item-title">Nome:</span>&nbsp;${item.name}</p>
                <p><span class="item-title">Valor:</span>&nbsp;${item.price}</p>
                <button data-btn="view" data-id=${item.id} >Visualizar</button>            
            </div>
        `;
        categories.push(item.category);
        brands.push(item.brand);
        colors.push(item.color);
        
    });

    const categoriesSet = new Set(categories);
    const brandsSet = new Set(brands);
    const colorsSet = new Set(colors);
    categoriesSet.forEach(category => {
        categoryFilter.innerHTML += `
            <label>
                <input type="checkbox" value="${category}" data-filter-type="category"> ${category}
            </label>
        `
    });

    brandsSet.forEach(brand => {
        brandFilter.innerHTML += `
            <label>
                <input type="checkbox" value="${brand}" data-filter-type="brand"> ${brand}
            </label>
        `
    });

    colorsSet.forEach(brand => {
        colorFilter.innerHTML += `
            <label>
                <input type="checkbox" value="${brand}" data-filter-type="color"> ${brand}
            </label>
        `
    });


    filterBtn.addEventListener("click", () => {
        window.scrollTo(0,0);
        filterModal.style.display = "flex";
        document.querySelector('.close-modal').addEventListener("click", e => {
            filterModal.style.display = "none";             
        });
    })
    applyBtn.addEventListener("click", applyFilters);


    refreshViewButtons();
})();

function search(searchText, filter={}) {
    carousel.innerHTML = "";
    if(!filter.brand) {
        data.forEach((item, index) => {     
            if(item.name.toLowerCase().includes(searchText.toLowerCase()) || item.brand.toLowerCase().includes(searchText.toLowerCase()) || item.category.toLowerCase().includes(searchText.toLowerCase())) {
                carousel.innerHTML += `
                    <div class="item">
                        <p><span class="item-title">Nome:</span>&nbsp;${item.name}</p>
                        <p><span class="item-title">Valor:</span>&nbsp;${item.price}</p>
                        <button data-btn="view" data-id=${item.id} >Visualizar</button>            
                    </div>
                `;   
            }
        });
    } else {
        carousel.innerHTML = "";
        const filteredData = [];
        data.forEach((item, index) => {     
            if(filter.brand.length === 0 && filter.category.length === 0 && filter.color.length === 0) {
                filteredData.push(item);
            } else if(filter.brand.length > 0 && filter.category.length > 0 && filter.color.length > 0) {
                if (filter.brand.includes(item.brand.toLowerCase()) && filter.category.includes(item.category.toLowerCase()) && filter.color.includes(item.color.toLowerCase())) 
                filteredData.push(item);
            } else if(filter.brand.length > 0 && filter.category.length > 0) {
                if (filter.brand.includes(item.brand.toLowerCase()) && filter.category.includes(item.category.toLowerCase())) 
                filteredData.push(item);
            } else if(filter.brand.length > 0 && filter.color.length > 0) {
                if (filter.brand.includes(item.brand.toLowerCase()) && filter.color.includes(item.color.toLowerCase())) 
                filteredData.push(item);
            } else if(filter.category.length > 0 && filter.color.length > 0) {
                if (filter.category.includes(item.category.toLowerCase()) && filter.color.includes(item.color.toLowerCase())) 
                filteredData.push(item);
            } else if(filter.category.length > 0 && filter.brand.length > 0) {
                if (filter.category.includes(item.category.toLowerCase()) && filter.brand.includes(item.brand.toLowerCase())) 
                filteredData.push(item);
            } else {
                if (filter.brand.includes(item.brand.toLowerCase()) || filter.category.includes(item.category.toLowerCase()) || filter.color.includes(item.color.toLowerCase()))  
                filteredData.push(item);
            }

        });
        const _filteredData = [...filteredData];
        filteredData.length = 0;

        _filteredData.forEach(item => {
            if(filter.disponibility == "Disponivel" && item.stock > 0) filteredData.push(item);
            else if(filter.disponibility == "Indisponivel" && item.stock <= 0) filteredData.push(item);
            else if(filter.disponibility == "Tudo") filteredData.push(item);
        });


        filteredData.forEach((item, index) => {     
                carousel.innerHTML += `
                    <div class="item">
                        <p><span class="item-title">Nome:</span>&nbsp;${item.name}</p>
                        <p><span class="item-title">Valor:</span>&nbsp;${item.price}</p>
                        <button data-btn="view" data-id=${item.id} >Visualizar</button>            
                    </div>
                `;   
            
        });
    }

    window.scrollTo(0, window.screen.height);
    refreshViewButtons();
}

searchBtn.addEventListener("click", () => {
    search(searchInput.value);
});


function refreshViewButtons() {
    let viewButtons = document.querySelectorAll("[data-btn=view]");
        viewButtons.forEach((btn, index) => {
            
            btn.addEventListener("click", () => {
                let id = Number(btn.dataset.id);
                data.forEach((item, index) => {     
                    
                    if(id === item.id) {
                        name.innerText = item.name;
                        brand.innerText = item.brand;
                        color.innerText = item.color;
                        price.innerText = item.price;
                        category.innerText = item.category;
                        disponibility.innerText = item.stock > 0 ? "Disponivel!" : "Indisponivel!";
                        image.src = "./img/" + item.brand.toLowerCase() + ".png";
                        window.scrollTo(0,0);
                    }
                });

            });
    });
}
 
function applyFilters() {
    filters.brand = [];
    filters.category = [];
    filters.color = [];

    const categoriesCheckbox = document.querySelectorAll("[data-filter-type=category]");

    categoriesCheckbox.forEach(checkbox => {
        if (checkbox.checked) filters.category.push(checkbox.value.toLowerCase());
    });

    const brandsCheckbox = document.querySelectorAll("[data-filter-type=brand]");

    brandsCheckbox.forEach(checkbox => {
        if (checkbox.checked) filters.brand.push(checkbox.value.toLowerCase());
    });

    const colorsCheckbox = document.querySelectorAll("[data-filter-type=color]");

    colorsCheckbox.forEach(checkbox => {
        if (checkbox.checked) filters.color.push(checkbox.value.toLowerCase());
    });

    radioButtons.forEach(radio => {
        if(radio.checked) filters.disponibility = radio.value;
    });

    search(searchInput.value, filters);
    filterModal.style.display = "none";
}

async function fetchData() {
    let data = await fetch("/api/shoes");
    data = await data.json();
    return data;
}