let flowers = [];
let filteredArr = [];

function showAlert() {
    document.querySelector('.alert').style.width = '25vw';
}

function hideAlert() {
    document.querySelector('.alert').style.width = '0vw';
}

function createFlowerElem(arr) {
    let index = 0;
    arr.forEach(element => {
        document.querySelector('.content').innerHTML += `
        <div class="item">
            <h2>${element.name}</h2>
            <p>${element.price}$</p>
            <div class="actions">  
                <button class="delete" onclick="deleteFlower(${element.id}, ${index++})">Delete</button>
            </div>
        </div>
        `;
    });
} 

async function getFlowers() {
    fetch('https://632c736e1aabd837399c6655.mockapi.io/flowers/')
        .then(res => res.json())
        .then(data => {
            cars = data;
            document.querySelector('.content').replaceChildren();
            createFlowerElem(flowers);
            getTotalPrice(flowers);
        })
        .catch(err => console.log(err));
}

function searchFlower() {
    document.querySelector('#name').checked = false;
    document.querySelector('#price').checked = false;
    let search = document.querySelector('#search').value;
    if (search) {
        let reg = new RegExp(`${search}`);
        filteredArr = cars.filter(element => reg.test(element.name) === true);
        document.querySelector('.content').replaceChildren();
        createFlowerElem(filteredArr);
        getTotalPrice(filteredArr);
    } else {
        getFlowers();
    }
}

function sortNameAl(arr) {
    document.querySelector('#price').checked = false;
    arr.sort((a, b) => {
        if (a.name.toUpperCase() > b.name.toUpperCase()) {
            return 1;
        } else if (a.name.toUpperCase() < b.name.toUpperCase()) {
            return -1;
        } else {
            return 0;
        }
    });
    document.querySelector('.content').replaceChildren();
    createFlowerElem(arr);
}

function sortByName() {
    if (document.querySelector('#name').checked) {
        if (document.querySelector('#search').value) {
            sortNameAl(filteredArr);
        } else {
            sortNameAl(flowers);
        }
    } else if (!document.querySelector('#search').value) {
        document.querySelector('.content').replaceChildren();
        getFlowres();
    }
}

function sortPriceAl(arr) {
    document.querySelector('#name').checked = false;
    arr.sort((a, b) => {
        return a.price - b.price;
    });
    document.querySelector('.content').replaceChildren();
    createFlowerElem(arr);
}

function sortByPrice() {
    if (document.querySelector('#price').checked) {
        if (document.querySelector('#search').value) {
            sortPriceAl(filteredArr);
        } else {
            sortPriceAl(cars);
        }
    } else if (!document.querySelector('#search').value) {
        document.querySelector('.content').replaceChildren();
        getFlowers();
    }
}

function getTotalPrice(arr) {
    let total = 0;
    console.log(arr);
    arr.forEach(element => {
        total += element.price;
    });
    document.querySelector('#totalPrice').textContent = `${total}$`;
}

async function deleteFlower(id, index) {
    fetch(`https://632c736e1aabd837399c6655.mockapi.io/flowers/${id}`,{
        method: 'DELETE'
    })  
    .then(res => {
        if(res.ok) {
            flowers.splice(index, 1);
            document.querySelector('.content').replaceChildren();
            createFlowerElem(flowers);
            getTotalPrice(flowers);
        }
    }) 
} 

getFlowers();