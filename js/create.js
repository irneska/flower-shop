function showAlert() {
    document.querySelector('.alert').style.width = '25vw';
}

function hideAlert() {
    document.querySelector('.alert').style.width = '0vw';
}

async function createFlower() {
    let name = document.querySelector('#nameField').value;
    let price = parseInt(document.querySelector('#priceField').value);
    console.log(typeof(price));
    if (name && price >= 1) {
        fetch('https://632c736e1aabd837399c6655.mockapi.io/flowers/', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                'name': name,
                'price': price,
            })
        })
            .then(res => {
                if (res.ok) {
                    name = '';
                    price = 1;
                    window.location.href = 'index.html';
                }
            })
            .catch(() => {
                document.querySelector('.alert').textContent = 'Form is invalid, check your info';
                showAlert();
            });
    }
}