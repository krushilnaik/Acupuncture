/*
***************************
*                         *
*       Basic setup       *
*                         *
***************************
*/

// brushes = document.querySelectorAll(`[name="severity"]`);


var canvas = document.querySelector("canvas");
var drawboard = canvas.getContext("2d");
var active_color;
var brush_size = 10;
radios = document.querySelectorAll(`input[name="severity"]`);

radios.forEach(function(radio) {
	if (radio.checked) {
		active_color = radio.value;
	}
})

var slider = document.getElementById("brush-size");


/*
***************************
*                         *
*        Functions        *
*                         *
***************************
*/

function getMouseLocation(event) {
	var box = canvas.getBoundingClientRect();
	return {
		x_pos: Math.floor(event.clientX - box.left),
		y_pos: Math.floor(event.clientY - box.top)
	};
}



// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Main code ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

/*
****************************
*                          *
*    Interactive canvas    *
*                          *
****************************
*/

canvas.addEventListener("click", function(e) {
	coords = getMouseLocation(e);

	drawboard.strokeStyle = active_color;
	drawboard.fillStyle = active_color;
	drawboard.beginPath();
	drawboard.arc(coords.x_pos, coords.y_pos, brush_size, 0, 2 * Math.PI, false);
	drawboard.closePath();
	drawboard.fill();
});



/*
****************************
*                          *
*  Brush size live update  *
*                          *
****************************
*/


// ~~~~~~~~~~ Default style ~~~~~~~~~~ //
style_text =
`
#brush-size::-webkit-slider-thumb {
	height: ${brush_size*2}px;
	width: ${brush_size*2}px;
	margin-top: -${brush_size-4}px;
	background: ${active_color};
}

#brush-size::-moz-range-thumb {
	height: ${brush_size*2}px;
	width: ${brush_size*2}px;
	margin-top: -${brush_size-4}%=px;
	background: ${active_color};
}

#brush-size::-ms-thumb {
	height: ${brush_size*2}px;
	width: ${brush_size*2}px;
	margin-top: -${brush_size-4}px;
	background: ${active_color};
}
`;
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //


style = document.createElement("style");
style.textContent = style_text;
document.head.appendChild(style);


// find width and height values
height_width_regex = / [0-9]+px/g

// find margin-top value
// exclude negative sign
margin_regex = /-[0-9.]+px/g

// find color value
color_regex = /#([a-fA-F0-9]+){6}/g


slider.addEventListener("input", function() {
	brush_size = slider.value;
	style.textContent = style.textContent.replace(height_width_regex, ` ${slider.value*2}px`)
										 .replace(margin_regex, `-${slider.value-4}px`);

	console.log(style.textContent);
})

/*
*****************************
*                           *
*  Brush color live update  *
*                           *
*****************************
*/

radios.forEach(function(radio) {
	radio.addEventListener("click", function() {
		active_color = radio.value;
		style.textContent = style.textContent.replace(color_regex, active_color);
		console.log(style.textContent);
	});
})
