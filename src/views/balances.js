import React from 'react';
import BarChart from '../components/bar-chart';
import Margin from '../components/margin';

export default class Balances extends React.Component {

    getElectricBillsDataset = () => {

        return {
            Jul: 0,
            Aug: 0,
            Sep: 0,
            Oct: 982,
            Nov: 0,
            Dec: 763,
        }
    }

    getGasBillsDataset = () => {

        return {
            Jul: 0,
            Aug: 0,
            Sep: 0,
            Oct: 83,
            Nov: 26,
            Dec: 57,
        }
    }

    render() {

        const electricDataset = this.getElectricBillsDataset();
        const gasDataset = this.getGasBillsDataset();
        
        return (
            <div>
                <BarChart id="Electric" title="Electric" dataset={electricDataset} />
                <Margin height="1rem" />
                <BarChart id="Gas" title="Gas" dataset={gasDataset} />
            </div>
        )
    }
}