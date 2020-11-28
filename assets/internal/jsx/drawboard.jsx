// import RadioGroup from './buttons'

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
			// first = false;
		}

		console.log(buttons);
		return React.createElement("div", {className: "check-block"}, ...buttons);
	}
}

class DrawboardCanvas extends React.Component {
	constructor(props) {
		super(props);
		this.canvasRef = React.createRef();
	}

	componentDidMount() {
		this.canvasContext = this.canvasRef.current.getContext("2d");
	}

	render() {
		return <canvas ref={this.canvasRef} width={this.props.width} height={this.props.height}></canvas>;
	}
}


class Drawboard extends React.Component {
	constructor(props) {
		super(props);
		this.canvasContext = null;
	}
	render() {
		const brushColors = [
			{"label": "Mild", "value": "#f0e68c"},
			{"label": "Moderate", "value": "#f08080"},
			{"label": "Strong", "value": "#eb1f48"},
		];

		const brushes = <RadioGroup group="severity" data={brushColors}></RadioGroup>;

		let canvas = <DrawboardCanvas width="550" height="450"></DrawboardCanvas>;
		// let drawboard = canvas.getContext("2d");

		return <React.Fragment>
			<h3>Please mark the area(s) that are bothering you</h3>
			<form action="#" method="post">
				<div className="check-block">
					<h6>Select "mild", "moderate", or "strong" before clicking on body areas to change severity. Default is "moderate".<br/>Use the slider to change mark size.</h6>

					{React.createElement("div", {className: "check-block"}, brushes)}

					<div id="block-paint-tools">
						<input type="range" id="brush-size" min="10" max="25" value="10"/>
						<button id="clear-canvas" type="button" onClick={this.canvasContext.clearRect(0, 0, 550, 450)}>Clear canvas</button>
					</div>
				</div>

				{canvas}
			</form>
		</React.Fragment>;
	}
}

(function() {
	ReactDOM.render(<Drawboard/>, document.getElementById("drawboard"));
})();
