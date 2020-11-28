(function () {
	// try {
	const heading = document.querySelector('.heading');
	const nullBuffer = document.querySelector('#null-buffer');

	const handler = (entries) => {
		if (!entries[0].isIntersecting) {
			heading.classList.add('out-of-view');
		} else {
			heading.classList.remove('out-of-view');
		}
	};

	const observer = new window.IntersectionObserver(handler);
	observer.observe(nullBuffer);
})();
