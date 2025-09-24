// 代码生成时间: 2025-09-24 12:39:14
 * interactive_chart_generator.js
 * A program that uses Ionic framework to create an interactive chart generator.
 *
 * Features:
 * - Chart data input
 * - Chart type selection
 * - Chart rendering
 * - Error handling
 */

// Import necessary Ionic libraries
import { IonicModule } from '@ionic/angular';
import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartData } from 'chart.js';
import { Label } from 'chart.js';

@Component({
  selector: 'app-interactive-chart-generator',
  templateUrl: './interactive-chart-generator.html',
  styleUrls: ['./interactive-chart-generator.css']
})
export class InteractiveChartGeneratorComponent {

  // Define the chart's type and data
  chartType: string = 'bar';
  chartData: ChartData<'bar', number[], Label[]> = {
    labels: [],
    datasets: [{
      label: 'Sample Data',
      data: [],
      backgroundColor: [],
      hoverBackgroundColor: []
    }]
  };
  chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Interactive Chart Generator'
      }
    },
  };

  constructor() {
    // Initialize the chart with default data
    this.initializeChart();
  }

  // Method to initialize the chart with default data
  initializeChart(): void {
    this.chartData.labels = ['January', 'February', 'March', 'April'];
    this.chartData.datasets[0].data = [10, 20, 30, 40];
    this.chartData.datasets[0].backgroundColor = [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)'
    ];
    this.chartData.datasets[0].hoverBackgroundColor = [
      'rgba(255, 99, 132, 0.4)',
      'rgba(54, 162, 235, 0.4)',
      'rgba(255, 206, 86, 0.4)',
      'rgba(75, 192, 192, 0.4)'
    ];
  }

  // Method to update the chart type
  updateChartType(type: string): void {
    switch (type) {
      case 'bar':
        this.chartType = 'bar';
        break;
      case 'line':
        this.chartType = 'line';
        break;
      case 'pie':
        this.chartType = 'pie';
        break;
      default:
        console.error('Unsupported chart type');
        return;
    }
    this.renderChart();
  }

  // Method to render the chart
  renderChart(): void {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: this.chartType,
      data: this.chartData,
      options: this.chartOptions
    });
  }

  // Method to handle chart data input
  onChartDataInput(data: string): void {
    try {
      const newData = JSON.parse(data);
      this.chartData.labels = newData.labels;
      this.chartData.datasets[0].data = newData.datasets[0].data;
      this.chartData.datasets[0].backgroundColor = newData.datasets[0].backgroundColor;
      this.chartData.datasets[0].hoverBackgroundColor = newData.datasets[0].hoverBackgroundColor;
      this.renderChart();
    } catch (error) {
      console.error('Error parsing chart data: ', error);
    }
  }
}
