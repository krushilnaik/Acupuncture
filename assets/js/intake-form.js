/*******************
*                  *
*    Date pickers  *
*                  *
********************/

// options = {format: "L"};
// pickers = [$("#appointment"), $("#dateofbirth"), $("#policy-holder-dob")];

// pickers.forEach( function(picker) {
// 	picker.datetimepicker(options);
// })



/***********************
*                      *
*    Age autocomplete  *
*                      *
************************/

$('#dateofbirth').on("change", function() {
	birthdate = this.value;
	age_field = document.getElementById("age");

	num_array = birthdate.split(/[./-]/g).map(num => Number(num));

	today = new Date();
	month = today.getMonth() + 1;
	day = today.getDay();
	year = today.getFullYear();

	age = year - num_array[2];

	if (month < num_array[0]) {
		age -= 1;
	}

	if (month == num_array[0]) {
		if (day < num_array[1]) {
			age -= 1;
		}
	}

	if (age > 0) {
		age_field.placeholder = `Age: ${age} years`;
	}
});



/*************************
*                        *
*        Functions       *
*                        *
**************************/

function liveNumberFormat(element, format, delimiter) {
	backup = element.value; // .replace(RegExp(delimiter.replace(" ", "\\s")), "");
	element.value = "";

	partitions = format.split(delimiter);
	spans = partitions.map(val => Number(val.length));
	trigger_lengths = spans.map(
		(_, index) =>
			spans.slice(0, index+1).reduce((a,b) => a + b, 0) + delimiter.length*index
	);

	is_number = /[0-9]/

	for (x = 0; x < backup.length; x++) {
		if (!is_number.test(backup[x])) {continue;}

		element.value += backup[x];

		cap = trigger_lengths[trigger_lengths.length-1];

		if (element.value.length > cap) {
			element.value = element.value.substring(0, cap);
			return;
		}

		for (i = 0; i < trigger_lengths.length; i++) {
			if (trigger_lengths[i] == element.value.length) {
				if (Number(partitions[i]) != 0) {
					temp = element.value.split(delimiter);
					temp[temp.length-1] = String(
						bounded = Math.min(
							Number(temp[temp.length-1]),
							Number(partitions[i])
						)
					).padStart(spans[i], "0");

					element.value = temp.join(delimiter);
				}

				if (element.value.length != format.length)
					{element.value += delimiter;}
			}
		}
	}

}


/*************************
*                        *
*  Date live-formatting  *
*                        *
**************************/

// dob_fields = [document.querySelector(`input[name="dateofbirth"]`)];

// if (dob_fields[0] != null) {
// 	dob_fields.forEach(function(field) {
// 		field.addEventListener("input", function(event) {
// 			if (event.inputType == "deleteContentBackward" && field.value.endsWith(" / ")) {
// 				field.value = field.value.slice(0, -3);
// 				return;
// 			}

// 			liveNumberFormat(this, "12 / 31 / 2020", " / ");
// 		});
// 	});
// }

/**************************
*                         *
*   SSN live-formatting   *
*                         *
***************************/

// 000-00-0000

ssn_field = document.querySelector("#ssn");

if (ssn_field) {
	ssn_field.addEventListener("input", function(event) {
		if (event.inputType == "deleteContentBackward") {
			// if (this.value.endsWith(/ -[\s]*/)) {
			if (/ -[\s]*$/.test(this.value)) {
				this.value = this.value.slice(0, -3);
				return;
			}
		}
		// if (event.inputType == "deleteContentBackward" && ssn_field.value.endsWith(" - ")) {
		// 	ssn_field.value = ssn_field.value.slice(0, -3);
		// 	return;
		// }

		liveNumberFormat(this, "000 - 00 - 0000", " - ");
	});
}


/**************************
*                         *
*   DOB live-formatting   *
*                         *
***************************/

// 00 / 00 / 0000

dob = document.querySelector("#dateofbirth");

if (dob) {
	dob.addEventListener("input", function(event) {
		if (event.inputType == "deleteContentBackward") {
			// if (this.value.endsWith(/ -[\s]*/)) {
			if (/ \/[\s]*$/.test(this.value)) {
				this.value = this.value.slice(0, -3);
				return;
			}
		}
		// if (event.inputType == "deleteContentBackward" && ssn_field.value.endsWith(" - ")) {
		// 	ssn_field.value = ssn_field.value.slice(0, -3);
		// 	return;
		// }

		liveNumberFormat(this, "00 / 00 / 0000", " / ");
	});
}


/******************************
*                             *
*   Phone # live formatting   *
*                             *
*******************************/


phone_fields = document.querySelectorAll(`input[type="tel"]`);
// console.log(phone_fields);

if (phone_fields) {
	phone_fields.forEach(function(field) {
		field.addEventListener("input", function (event) {
			// console.log(event);
			// if (event.inputType == "deleteContentBackward" && this.value.endsWith(" - ")) {
			// 	this.value = this.value.slice(0, -3);
			// 	return;
			// } else if (event.inputType == "deleteContentBackward" && this.value.endsWith(" -")) {
			// 	this.value = this.value.slice(0, -3);
			// 	return;
			// }
			if (event.inputType == "deleteContentBackward") {
				// if (this.value.endsWith(/ -[\s]*/)) {
				if (/ -[\s]*$/.test(this.value)) {
					this.value = this.value.slice(0, -3);
					return;
				}
			}

			liveNumberFormat(this, "000 - 000 - 0000", " - ");
		});
	});
}


/******************************
*                             *
*   Gender-specific toggling  *
*                             *
*******************************/

// male = document.querySelector(`option[value="male"]`);
// female = document.querySelector(`option[value="female"]`);


// block_text =
// `
// .blocking-overlay {display: ${female ? "block" : "none"};}
// .conditional {filter: blur(${female ? 2 : 0}px);}
// `
// console.log(block_text);

// overlay_regex = /display: "(block|none)"/
// blur_regex = /blur\([0-9]px\)/

// block = document.createElement("style");
// block.textContent = block_text;
// document.head.appendChild(block);

// sex = document.querySelector("#sex");

// sex = {male, female};

// sex.forEach(function(field) {
// sex.addEventListener("change", function () {
// 	console.log("sex changed");

// 	block_text = block_text.replace(blur_regex, `blur(${sex.value == "female" ? 2 : 0}px)`)
// 						   .replace(overlay_regex, `display: ${sex.value == "female" ? "block" : "none"}`);
// 	block.textContent = block_text;

// 	console.log(block_text);
// })
// });


// sections = document.querySelectorAll(".conditional");

