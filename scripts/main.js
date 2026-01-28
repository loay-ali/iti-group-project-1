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