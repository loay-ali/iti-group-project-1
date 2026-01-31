// نجيب الـ id من query string
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

const main = document.getElementById('product-details');

fetch(`http://localhost:8000/${productId}`)
  .then(res => res.json())
  .then(product => {
main.innerHTML = `
  <div class="row">
    <div class="col-md-6">
      <img src="${product.image}" alt="${product.name}" class="img-fluid">
    </div>

    <div class="col-md-6">
      <h2>${product.name}</h2>
      <p>Brand: ${product.brand}</p>
      <p>Price: $${product.price.toFixed(2)} ${product.currency}</p>
      <p>${product.description}</p>

      <button class="btn btn-primary mb-3"  id="mainBtn">Add to Cart</button>

      <div class="quantity-wrapper">
        <button class="qty-btn" id="decrease">−</button>
        <input type = "number" value = "1" id="quantity" />
        <button class="qty-btn" id="increase">+</button>
      </div>
    </div>
  </div>
`;

    document.getElementById('increase').addEventListener('click',event => {
      increaseQuantity(event);
    });

    document.getElementById('decrease').addEventListener('click',event => {
      decreaseQuantity(event);
    });

  })
  .catch(err => {
    main.innerHTML = `<p class="text-danger">Failed to load product</p>`;
    console.error(err);
  });

