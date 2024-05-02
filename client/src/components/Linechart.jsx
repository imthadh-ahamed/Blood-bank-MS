import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Linechart extends Component {
	render() {
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", // "light1", "dark1", "dark2"
			title:{
				text: "Monthly Donor Demand"
			},
			axisY: {
				title: "Donors"
			},
			axisX: {
				title: "Months of Year",
				interval: 1
			},
			data: [{
				type: "line",
				toolTipContent: "Month {x}: {y}",
				dataPoints: [
					{ x: 1, y: 64 },
					{ x: 2, y: 61 },
					{ x: 3, y: 64 },
					{ x: 4, y: 62 },
					{ x: 5, y: 64 },
					{ x: 6, y: 60 },
					{ x: 7, y: 58 },
					{ x: 8, y: 59 },
					{ x: 9, y: 53 },
					{ x: 10, y: 54 },
					{ x: 11, y: 61 },
					{ x: 12, y: 60 }
				]
			}]
		};

		return (
			<div>
				<CanvasJSChart options={options} />
			</div>
		);
	}
}

export default Linechart;
