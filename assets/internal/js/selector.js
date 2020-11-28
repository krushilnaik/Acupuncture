
blocker_style_text =
`
.blocking-overlay {
	position: absolute;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
	display: block;
	z-index: 100;
}

.conditional {filter: blur(2px);}
`

overlay_regex = /(block|none);/
blur_regex = /blur\([0-9]px\);/

blocker_style = document.createElement("style");
blocker_style.textContent = blocker_style_text;
document.head.appendChild(blocker_style);





function closeAllSelect(e) {
	arrNo = [];
	x = document.getElementsByClassName("select-items");
	y = document.getElementsByClassName("current-choice");
	for (i = 0; i < y.length; i++) {
		if (e == y[i]) arrNo.push(i);
		else y[i].classList.remove("select-arrow-active");
	}

	for (i = 0; i < x.length; i++)
		if (arrNo.indexOf(i))
			x[i].classList.add("select-hide");
}


x = document.getElementsByClassName("custom-select");

for (i = 0; i < x.length; i++) {
	selElmnt = x[i].getElementsByTagName("select")[0];

	a = document.createElement("DIV");
	a.setAttribute("class", "current-choice");
	a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
	x[i].appendChild(a);

	b = document.createElement("DIV");
	b.setAttribute("class", "select-items select-hide");

	for (j = 1; j < selElmnt.length; j++) {
		c = document.createElement("DIV");
		c.innerHTML = selElmnt.options[j].innerHTML;
		c.addEventListener("click", function() {
			s = this.parentNode.parentNode.getElementsByTagName("select")[0];
			h = this.parentNode.previousSibling;

			for (i = 0; i < s.length; i++) {
				if (s.options[i].innerHTML == this.innerHTML) {
					s.selectedIndex = i;
					h.innerHTML = this.innerHTML;
					// console.log(this.innerHTML);						
					break;
				}
			}
			h.click();

			// if (this.innerHTML == "Female" || this.innerHTML == "Male") {
			if (this.parentNode.parentNode.id == "sex") {
				// console.log(this);
				// console.log(this.parentNode.parentNode.id);
				// console.log(`sex changed to ${this.innerHTML}`);
				blocker_style_text = blocker_style_text.replace(blur_regex, `blur(${this.innerHTML == "Female" ? 0 : 2}px);`)
										.replace(overlay_regex, `${this.innerHTML == "Female" ? "none" : "block"};`);
				blocker_style.textContent = blocker_style_text;
				// console.log(blocker_style_text);
				// console.log(`blur_regex --> ${blocker_style_text.match(blur_regex)}`);
				// console.log(`overlay_regex --> ${blocker_style_text.match(overlay_regex)}`);
			}
		});
		b.appendChild(c);
	}

	x[i].appendChild(b);

	a.addEventListener("click", function(e) {
		e.stopPropagation();
		closeAllSelect(this);
		this.nextSibling.classList.toggle("select-hide");
		this.classList.toggle("select-arrow-active");
	});
}


document.addEventListener("click", closeAllSelect);