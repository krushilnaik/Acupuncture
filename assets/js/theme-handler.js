const lightMode = {
	"wallpaper": "#c8dbff",

	"red": "#f32c61",
	"green": "#71c79c",
	"orange": "#f88a6c",
	"blue": "#6495ed",
	"white": "#f0fff0",
	"black": "#222222",
	"brown": "#bc8f8f",

	"dark_red": "#c70c3e",
	"dark_green": "#42986e",
	"dark_orange": "#ce6244",
	"dark_blue": "#2164df",
	"dark_white": "#dce9e9",
	"dark_brown": "#795c5c",

	"darker_than_back": "#00000030",
	"lighter_than_back": "#ffffff30"
};

const darkMode = {
	"wallpaper": "#383838",

	"red": "#f32c61",
	"green": "#4d8468",
	"orange": "#f55023",
	"blue": "#6495ed",
	"white": `${lightMode.black}`,
	"black": `${lightMode.white}`,
	"brown": "#795c5c",

	"dark_red": "#c70c3e",
	"dark_green": "#4f6d5e",
	"dark_orange": "#ca5c3f",
	"dark_blue": "#2164df",
	"dark_white": "#181818",
	"dark_brown": "#795c5c",

	"darker_than_back": "#ffffff30",
	"lighter_than_back": "#00000030"
}

function reloadCSS() {
	$("link").each(function() {
		if ($(this).attr("rel") == "stylesheet") {
			if ($(this).attr("href").startsWith("assets")) {
				$(this).attr("href", $(this).attr("href") + "?id=" + (new Date()).getMilliseconds());
				console.log(`Reloaded ${$(this).attr("href")}`);
			}
		}
	});

	return true;
}

let themeSwitch = document.getElementById('reload-css');

themeSwitch.addEventListener(
	"click",
	() => {
		themeSwitch.style.animation = "rotate .5s";

		switch (themeSwitch.className) {
			case "dark":
				themeSwitch.firstElementChild.src = "assets/images/icons/dark-mode.png";
				themeSwitch.className = "light";

				document.body.style = "";

				break;
			case "light":
				themeSwitch.firstElementChild.src = "assets/images/icons/light-mode.png";
				themeSwitch.className = "dark";
				themeSwitch.style.boxShadow = "1px 1px 3px white";

				document.body.style = `
					--acu-wallpaper: ${darkMode.wallpaper} !important;
					--acu-red: ${darkMode.red} !important;
					--acu-orange: ${darkMode.orange} !important;
					--acu-green: ${darkMode.green} !important;
					--acu-blue: ${darkMode.blue} !important;
					--acu-white: ${darkMode.white} !important;
					--acu-black: ${darkMode.black} !important;

					--acu-dark-red: ${darkMode.dark_red} !important;
					--acu-dark-orange: ${darkMode.dark_orange} !important;
					--acu-dark-green: ${darkMode.dark_green} !important;
					--acu-dark-blue: ${darkMode.dark_blue} !important;
					--acu-dark-white: ${darkMode.dark_white} !important;
				`;
		}

		localStorage.setItem("theme", themeSwitch.className);

		setTimeout(
			() => {themeSwitch.style.animation = "";},
			500
		);

		reloadCSS();
	}
);

if (localStorage.getItem("theme") == "dark") {
	$("#reload-css").click();
}
