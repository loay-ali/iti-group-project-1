/* Menu & Submenus */
Array.from(document.getElementsByClassName('menu-toggle')).forEach(element => {
	element.addEventListener('click',event => {
		event.currentTarget.classList.toggle('active');
		document.getElementById(event.currentTarget.dataset.toggle).classList.toggle('active');
		if( event.currentTarget.dataset.original ) {
			document.getElementById(event.currentTarget.dataset.original).classList.remove('active');
		}
	});
});

/* Toggle Main Menu (Phone Only) */
document.getElementById('toggle-main-menu').addEventListener("click",event => {
	event.currentTarget.classList.toggle('active');
});

/* Toggle Search Menu */
const searchPanel = document.getElementById('search-panel');

document.getElementById('open-search-panel').addEventListener('click',() => {
	searchPanel.classList.add('active');
});

document.getElementById('close-search-panel').addEventListener('click',() => {
	searchPanel.classList.remove('active');
})

/* Toggle Mini Cart */
const cartPanel = document.getElementById('cart-panel');

document.getElementById('open-cart-panel').addEventListener('click',() => {
	cartPanel.classList.add('active');
});

const closeCart = () => {
	cartPanel.classList.remove('active')
};

document.getElementById('close-cart-panel').addEventListener('click',closeCart);
cartPanel.getElementsByClassName('layout')[0].addEventListener('click',closeCart);

//Dynamic Cart
const updateCartCounter = () => cartCounter.dataset['count'] = Object.keys(getCart()).length;

function getCart() {
	const data = JSON.parse(localStorage.getItem('cart'));

	return data == null ? []:data;
}

document.body.addEventListener('click',event => {
	if( event.target.classList.contains('add-to-cart') ) {
		const cart = getCart();
		const productId = event.target.dataset['id'];
		cart[productId] = ~~(cart[productId]) + 1;
	
	localStorage.setItem('cart',JSON.stringify(cart));
	}
});

//Get Data
const cartAjaxAgent = new XMLHttpRequest();
cartAjaxAgent.open("GET","http://localhost:8000");
cartAjaxAgent.send();

const cartCounter = document.getElementById('open-cart-panel');

const emptyCartCond = document.getElementById('empty-cart');
const cartList = document.getElementById('cart-products-table');
const cartTotals = document.getElementById('cart-totals');

function fillCart(data) {
	const currentCart = getCart();

	if( Object.keys(currentCart).length == 0 ) {
		emptyCartCond.style.display = 'block';
		cartList.style.display = 'none';
	
		return;
	}

	let totaCart = 0;
	cartList.innerHTML = '';

	for( let product in currentCart ) {
		const productData = data.filter(prod => prod.id == product)[0];
		const tr = document.createElement('tr');

		const dataField = document.createElement('td');
		
		const img = document.createElement('img');
		img.src = productData.image;
		img.alt = productData.name + " Image";
		img.width = 200;

		const brand = document.createElement('small');
		brand.innerText = productData.brand;
		brand.className = 'text-primary';

		const title = document.createElement('span');
		title.innerText = productData.name;
		
		const price = document.createElement('span');
		price.innerText = "$"+ productData.price;

		dataField.appendChild(img);
		dataField.appendChild(brand);
		dataField.appendChild(title);
		dataField.appendChild(price);

		tr.appendChild(dataField);

		const total = document.createElement('td');
		total.innerText = "$"+ (productData.price * currentCart[product]);

		tr.appendChild(total);

		totaCart += (productData.price * currentCart[product]);

		cartList.appendChild(tr);
	}

	cartTotals.innerText = '$'+ totaCart + ' USD';
}

cartAjaxAgent.addEventListener('readystatechange',() => {
	if( cartAjaxAgent.readyState == 4 ) {
		fillCart(JSON.parse(cartAjaxAgent.response).data);
	}
});

//Initial Cart Counter
window.addEventListener('load',updateCartCounter);