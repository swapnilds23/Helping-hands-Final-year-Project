import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart } from 'chart.js';

var originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
  draw: function() {
    originalDoughnutDraw.apply(this, arguments);

    var chart = this.chart.chart;
    var ctx = chart.ctx;
    var width = chart.width;
    var height = chart.height;

    var fontSize = (height / 114).toFixed(2);
    ctx.font = fontSize + "em Verdana";
    ctx.textBaseline = "middle";

    var text = chart.config.data.text,
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 2;

    ctx.fillText(text, textX, textY);
  }
});

class MoneyGraph extends Component{

  constructor(props){
    super(props)
    this.state = {
      labels: ['Development Work', 'Emergency response work', 'Campaingning for change',
              'Support and running cost', 'fundraising costs'],
      datasets: [{
        data:[42, 37, 3, 10, 8],
        backgroundColor: ['orange','red', 'green', 'yellow', 'blue']
      }]
    }
  }

  render(){
    return(
      <div>
        <h1><b>For Every $1 Given To Helpinghands..</b></h1>
        <Doughnut
          data = {{
              labels: this.state.labels,
              datasets: this.state.datasets,
              text: "$1"
          }}
          height = {80}

        />
        <br />

      </div>
    )
  }

}

export default MoneyGraph
