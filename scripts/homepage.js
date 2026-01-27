//On-Scroll Effect
const elements = Array.from(document.getElementsByClassName('show-on-scroll'));
function onScroll() {
	if( (elements[0].offsetTop - (elements[0].offsetHeight / 2)) <= (window.scrollY + (window.innerHeight / 1.5)) ) {
		console.log(elements[0],"In View!");
		elements[0].classList.add('show');
		elements.shift();
	}

	if( elements.length == 0 ) {
		window.removeEventListener('scroll',onScroll);
	}
}

window.addEventListener('scroll',onScroll);

//Product Carousel
function changeSlide(slide,changeBy) {
	let newPos = Number(slide.dataset['current']) + changeBy;
	const limit = Number(slide.dataset['limit']);

	if( newPos >= limit ) {
		newPos = 0;
	}else if( newPos < 0 ) {
		newPos = limit - 1;
	}

	slide.dataset['current'] = newPos;

	slide.getElementsByClassName('carousel-current')[0].innerText = newPos + 1;
	slide.getElementsByClassName('carousel-container')[0].style.left = '-'+ (newPos * 100) +'%';
}

Array.from(document.getElementsByClassName('products-carousel')).forEach(slide => {

	const container = slide.getElementsByClassName('carousel-container');
	if( container.length == 0 ) return;

	slide.dataset['count'] = container[0].children.length;
	slide.dataset['current'] = 0;

	const assignSlideProps = () => {
		if( document.body.offsetWidth >= 768 ) {
			slide.dataset['limit'] = Math.ceil(slide.dataset['count'] / 5);
		}else {
			slide.dataset['limit'] = Math.ceil(slide.dataset['count'] / 2);
		}

		slide.getElementsByClassName('carousel-limit')[0].innerText = slide.dataset['limit'];

		container[0].style.width = Number(slide.dataset['limit']) * 100 +'%';
	};


	//Drag & Slide Effect On Slider + Touching
	var anchorPosition = undefined;
	const eventDownFunc = downEvent => {
		anchorPosition = downEvent.__proto__.constructor == TouchEvent ? downEvent.changedTouches[0].clientX:downEvent.clientX;
	};

	const eventMoveFunc = moveEvent => {
		if( anchorPosition == undefined ) return;

		let currentPosition = 0;
		
		if( moveEvent.__proto__.constructor === TouchEvent ) currentPosition = moveEvent.changedTouches[0].clientX;
		else currentPosition = moveEvent.clientX;

		if( Math.abs(anchorPosition - currentPosition) <= 150 ) {
			container[0].style.marginLeft = ((currentPosition - anchorPosition) / 1.75) + 'px';
		}
	}

	const eventUpFunc = upEvent => {

		container[0].style.marginLeft = '0px';
		let diff = 0;
		if( upEvent.__proto__.constructor === TouchEvent ) diff = anchorPosition - upEvent.changedTouches[0].clientX;
		else diff = anchorPosition - upEvent.clientX;
		
		anchorPosition = undefined;
		if( diff >= 100 ) {
			changeSlide(container[0].parentElement,1);
		}else if( diff <= 100 ) {
			changeSlide(container[0].parentElement,-1);
		}
	};

	container[0].addEventListener('mousedown',eventDownFunc);
	container[0].addEventListener('mouseup',eventUpFunc);
	container[0].addEventListener('mousemove',eventMoveFunc);

	container[0].addEventListener('touchstart',eventDownFunc);
	container[0].addEventListener('touchmove',eventMoveFunc);
	container[0].addEventListener('touchend',eventUpFunc);

	window.addEventListener('resize',assignSlideProps);
	window.addEventListener('load',assignSlideProps);

	slide.getElementsByClassName('prev-slide')[0].addEventListener('click',() => {
		changeSlide(slide,-1);
	});

	slide.getElementsByClassName('next-slide')[0].addEventListener('click',() => {
		changeSlide(slide,1);
	});
});