// const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const openHours = [
	"Sunday: Closed",
	"Monday: 3–6PM",
	"Tuesday: 9AM–7PM",
	"Wednesday: 9AM–7PM",
	"Thursday: 12–6PM",
	"Friday: 9AM–7PM",
	"Saturday: 9AM–2PM"
];

var todaysHours = document.getElementById("hours");

todaysHours.innerHTML = `${openHours[Date().getDay()]}`;