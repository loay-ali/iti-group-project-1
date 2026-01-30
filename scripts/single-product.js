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
        <span id="quantity">1</span>
        <button class="qty-btn" id="increase">+</button>
      </div>
    </div>
  </div>
`;

  })
  .catch(err => {
    main.innerHTML = `<p class="text-danger">Failed to load product</p>`;
    console.error(err);
  });



  // ================================================

  let quantity = 1;

const quantityEl = document.getElementById('quantity');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');

increaseBtn.addEventListener('click', () => {
  quantity++;
  quantityEl.textContent = quantity;
});

decreaseBtn.addEventListener('click', () => {
  if (quantity > 1) {
    quantity--;
    quantityEl.textContent = quantity;
  }
});

