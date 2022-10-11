function toMainPage() {
    window.location.href = 'index.html';
}

function showAlert() {
    document.querySelector('.alert').style.width = '25vw';
}

function hideAlert() {
    document.querySelector('.alert').style.width = '0vw';
}

async function createFlower() {
    let name = document.querySelector('#flowerName').value;
    let image = document.querySelector('#flowerImage').value;
    let price = parseInt(document.querySelector('#flowerPrice').value);
    if (name && image && price && price >= 1) {
        fetch('http://localhost:8080/api/v1/flower', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                'name': name,
                'image': image,
                'price': price
            })
        })
            .then(res => {
                if (res.status === 200) {
                    name = '';
                    image = '';
                    price = '';
                    window.location.href = 'index.html';
                }
            })
            .catch(() => {
                document.querySelector('.alert').textContent = 'Form is invalid, check your info';
                showAlert();
            });
    }
}
