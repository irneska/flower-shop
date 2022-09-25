let flowerId = localStorage.getItem('id');
let flowerName = document.querySelector('#nameField');
let flowerPrice = document.querySelector('#priceField');

function showAlert() {
    document.querySelector('.alert').style.width = '25vw';
}

function hideAlert() {
    document.querySelector('.alert').style.width = '0vw';
}

async function getFlower(id) {
    fetch(`https://632c736e1aabd837399c6655.mockapi.io/flowers/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            carName.value = data.name;
            carPrice.value = data.price;
        })
        .catch((err) => {
            document.querySelector('.alert').textContent = `${err}`;
            showAlert();
        });
}

async function updateFlower() {
    if (flowerName.value && flowerPrice.value && flowerPrice.value >= 1) {
        fetch(`https://632c736e1aabd837399c6655.mockapi.io/flowers/${flowerId}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                'name': flowerName.value,
                'price': parseInt(flowerPrice.value),
            })
        })
            .then(res => {
                if (res.ok) {
                    flowerName.value = '';
                    flowerrPrice.value = '';
                    localStorage.removeItem('id');
                    window.location.href = 'index.html';
                } else {
                    showAlert();
                }
            })
            .catch(() => {
                document.querySelector('.alert').textContent = 'Form is invalid, check your info';
                showAlert();
            })
    }
}

getFlower(flowerId);