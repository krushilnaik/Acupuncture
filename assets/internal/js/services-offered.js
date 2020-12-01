{/*

<div class="service-group">
	<div class="service-border">
		<div class="service-title">Acupuncture</div>
	</div>
	<div id="acupuncture" class="service">
		is an ancient Asian therapy that consists of stimulating designated points with needles to restore and balance the body’s energy, or Qi (pronounced chee).
		These are gateways through which the practitioner exerts influence upon organs and functions, stimulating and activating the body’s self-healing mechanisms.
		It is a part of Traditional Chinese Medicine (TCM), which also includes the application of electrical stimulation, heat, acupressure, diet, and Herbal Medicine.
	</div>
</div>

*/}

let groups = document.querySelectorAll(".service-group");

for (var i = 0; i < groups.length; i++) {
	let border = groups[i].querySelector(".service-border");
	let borderInner = border.querySelector(".service-title");
	let textContent = groups[i].querySelector(".service");

	const borderSize = 4;

	const innerWidth = Number(getComputedStyle(borderInner, null).width.slice(0, -2));
	const innerHeight = Number(getComputedStyle(borderInner, null).height.slice(0, -2));
	border.style.width = `${innerWidth + borderSize*2}px`;
	border.style.height = `${innerHeight + borderSize*2}px`;
	borderInner.style.marginTop = `${borderSize}px`;
	borderInner.style.marginLeft = `${borderSize}px`;

	console.log(getComputedStyle(borderInner, null).width);
	console.log(innerWidth);

	// border.style.width = getComputedStyle(borderInner, null).width;
}