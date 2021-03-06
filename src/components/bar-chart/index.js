import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';

export default class BarChart extends React.Component {

    componentDidMount() {
        const {
            // title,
            dataset,
            id,
        } = this.props;

        const labels = [];
        const values = [];
        const barColors = [];

        const keys = Object.keys(dataset);
        keys.forEach((d, i) => {
            labels.push(d);
            values.push(dataset[d]);
            barColors.push((i === keys.length - 1) ? '#59F8E8' : '#C1CFDA');
        })

        let ctx = document.getElementById(id);
        new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: labels,
                datasets: [{
                    // label: title,
                    data: values,
                    backgroundColor: barColors,
                    borderColor: barColors,
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    display: false,
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
    }

    render() {
        const { id } = this.props;

        return (
            <canvas id={id} width="2" height="1" />
        )
    }
}

BarChart.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    // title: PropTypes.string,
    dataset: PropTypes.object,
}