let flowerId = localStorage.getItem('id');
let flowerName = document.querySelector('#flowerName');
let flowerPrice = document.querySelector('#flowerPrice');
let flowerImage = document.querySelector('#flowerImage');

function toMainPage() {
    window.location.href = 'index.html';
}

function showAlert() {
    document.querySelector('.alert').style.width = '25vw';
}

function hideAlert() {
    document.querySelector('.alert').style.width = '0vw';
}

async function getFlower(id) {
    fetch(`http://localhost:8080/api/v1/flower/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            flowerName.value = data.name;
            flowerImage.value = data.image;
            flowerPrice.value = data.price;
        })
        .catch((err) => {
            document.querySelector('.alert').textContent = `${err}`;
            showAlert();
        });
}

async function updateFlower() {
    if (flowerName.value && flowerImage.value && flowerPrice.value >= 1) {
        fetch(`http://localhost:8080/api/v1/flower/${flowerId}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                'name': flowerName.value,
                'image': flowerImage.value,
                'price': flowerPrice.value
            })
        })
            .then(res => {
                if (res.status === 200) {
                    flowerName.value = '';
                    flowerImage.value = '';
                    flowerPrice.value = '';
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