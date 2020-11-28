class Checkbox extends React.Component {
	render() {
		const id_regex = /\s*([(].*?[)])/g;
		let id = this.props.content.replace(id_regex, "");

		return (
			<div className="checkbox check">
				<div className="label">{this.props.content}</div>
				<input type="checkbox" id={id.replaceAll(" ", "-")}/>
				<div className="decoy-checkbox"></div>
			</div>
		);
	}
}

class Radiobox extends React.Component {
	render() {
		const id_regex = /\s*([(].*?[)])/g;
		let id = this.props.content.replace(id_regex, "");

		return (
			<div className="checkbox radio">
				<div className="label">{this.props.content}</div>
				<input type="radio" id={id.replaceAll(" ", "-")} defaultChecked={this.props.value == this.props.checked} name={this.props.group} value={this.props.value}/>
				<div className={`decoy-checkbox ${this.props.content.toLowerCase()}`}></div>
			</div>
		);
	}
}

class RadioGroup extends React.Component {
	render() {
		const data = this.props.data;
		var buttons = [];
		let defaultSetting = "moderate";
		for (const b of data) {
			buttons.push(
				<Radiobox content={b.label} group={this.props.group} checked={defaultSetting} value={b.value}></Radiobox>
			);
			first = false;
		}

		console.log(buttons);
		return React.createElement("div", {className: "check-block"}, ...buttons);
	}
}


// (function () {
// 	const drawboard = [
// 		{"label": "Mild", "value": "#f0e68c"},
// 		{"label": "Moderate", "value": "#f08080"},
// 		{"label": "Strong", "value": "#eb1f48"},
// 	]

// 	const test = <RadioGroup group="severity" data={drawboard}></RadioGroup>;

// 	let dropPoint = document.getElementById("test");

// 	ReactDOM.render(test, dropPoint);

// 	console.log(dropPoint);
// })();
