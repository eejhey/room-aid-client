import React from 'react';
import BarChart from '../components/bar-chart';
import { Card, CardContent, Typography } from '@material-ui/core';
import { MonthName } from '../constants/month';

export default class Balances extends React.Component {

    electric = {
        title: 'LA DWP',
        dataset: {
            Oct: 982,
            Dec: 763,
        }
    }

    socalGas = {
        title: 'SoCal Gas',
        bills: [
            {
                issueDate: '08/21/2018',
                balance: '38.24',
            },
            {
                issueDate: '09/19/2018',
                balance: '63.69',
            },
            {
                issueDate: '10/22/2018',
                balance: '26.91',
            },
            {
                issueDate: '11/21/2018',
                balance: '38.75',
            },
            {
                issueDate: '12/21/2018',
                balance: '80.95',
            },
            {
                issueDate: '01/23/2019',
                balance: '87.77',
            },
            {
                issueDate: '02/22/2019',
                balance: '122.65',
            },
            {
                issueDate: '03/25/2019',
                balance: '87.24',
            },
            {
                issueDate: '04/23/2019',
                balance: '13.82',
            },
            {
                issueDate: '05/22/2019',
                balance: '29.54',
            },
            {
                issueDate: '06/21/2019',
                balance: '46.32',
            },
        ]
    }

    dwp = {
        title: 'LA DWP',
        bills: [
            {
                issueDate: '09/26/2018',
                dueDate: '10/31/2018',
                balance: '982.16',
            },
            {
                issueDate: '11/29/2018',
                dueDate: '12/2018',
                balance: '726.55',
            },
            {
                issueDate: '01/30/2019',
                dueDate: '02/2019',
                balance: '650.65',
            },
            {
                issueDate: '03/29/2019',
                dueDate: '04/2019',
                balance: '778.24',
            },
            {
                issueDate: '05/29/2019',
                dueDate: '06/30/2019',
                balance: '1349.42',
            },
        ]
    }

    gas = {
        title: 'Gas',
        dataset: {
            Jul: 0,
            Aug: 0,
            Sep: 0,
            Oct: 83,
            Nov: 26,
            Dec: 57,
        }
    }
    render() {
        // const bills = [this.electric, this.gas];
        const bills = [this.dwp, this.socalGas];

        const cards = bills.map(billInfo => {
            const dataset = {}
            billInfo.bills.forEach(b => {
                const month = Number(b.issueDate.substr(0, 2));
                const monthName = MonthName[month];
                dataset[monthName.substr(0, 3)] = b.balance;
            });

            return (
                <Card key={billInfo.title}
                    style={{
                        width: '90%',
                        marginBottom: '1rem',
                        maxWidth: '400px',
                    }}>
                    <CardContent>
                        <Typography variant='subtitle2'>
                            {billInfo.title.toUpperCase()}
                        </Typography>
                        <BarChart id={billInfo.title}
                            dataset={dataset} />
                </CardContent>
                </Card>
            )
        })

        return (
            <div className='flex-column align-center'
                style={{ padding: '1rem' }}>
                {cards}
            </div>
        )
    }
}