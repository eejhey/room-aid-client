import React from 'react';
import classNames from 'classnames';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PaidIcon from '@material-ui/icons/Check';
import UnpaidIcon from '@material-ui/icons/Close';
import { Transition } from 'react-spring/renderprops';
import { withStyles } from '@material-ui/styles';
import {
    Card,
    CardContent,
    Typography,
    CardActionArea,
    IconButton,
    Collapse,
} from '@material-ui/core';

const styles = theme => ({
    card: {
        flexGrow: '0',
        // minWidth: '270px',
        marginBottom: theme.spacing.unit,
        width: '80%',
        maxWidth: '300px',
        // '@media (max-width: 399px)': {
        // },
        // '@media (min-width: 400px)': {
        //     marginRight: theme.spacing.unit,
        // },
    },
    rentCardActionText: {
        paddingLeft: '5%',
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        fontSize: '0.9em',
    },
    expandIconBase: {
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandIconOpen: {
        transform: 'rotate(180deg)',
    },
    expansionSummaryText: {
        minWidth: '20ch',
    },
})

class RentDashboardCard extends React.PureComponent {

    state = {
        expanded: false,
    }

    onChangeExpansionPanel = (_, expanded) => {
        this.setState({expanded});
    }

    render() {
        const {
            classes,
            rentBalance,
            dueDate: dueDateProp,
            dueDay: dueDayProp,
        } = this.props;
        const { expanded } = this.state;

        let dueDate = dueDateProp;

        if (!dueDate && !!dueDayProp) {
            const today = new Date();
            const due = new Date(today.getFullYear(), today.getMonth() + 2, dueDayProp);
            dueDate = `${due.getMonth()}/${due.getDate()}/${due.getFullYear()}`
        }

        const tenants = [
            { name: 'Master', hasPaid: true },
            { name: 'Ceazar', hasPaid: true },
            { name: 'Josh', hasPaid: true },
            { name: 'Lesley', hasPaid: true },
            { name: 'Napolean', hasPaid: false },
        ]

        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant='subtitle2'>
                        RENT
                    </Typography>
                    <Typography variant='h5'>
                        ${rentBalance}
                    </Typography>
                    <Typography variant='caption'>
                        Due By {dueDate}
                    </Typography>
                </CardContent>
                <CardActionArea
                    onClick={() => this.setState({ expanded: !expanded })}>
                    <div className='flex-row space-between'>
                        <Typography className={classes.rentCardActionText}
                            variant='button'
                        >
                            <Transition
                                items={expanded}
                                from={{ position: 'absolute', opacity: 0 }}
                                enter={{ opacity: 1 }}
                                leave={{ opacity: 0 }}>
                                {expanded =>
                                    expanded
                                        ? props => <div style={props}>{"Hide who's paid"}</div>
                                        : props => <div style={props}>{"Show who's paid"}</div>
                                }
                            </Transition>
                        </Typography>
                        <IconButton component='div'>
                            <ExpandMoreIcon
                                className={classNames(
                                    classes.expandIconBase,
                                    expanded && classes.expandIconOpen)}
                            />
                        </IconButton>
                    </div>
                </CardActionArea>
                <Collapse in={expanded}>
                    <CardContent>
                        {tenants.map((tenant, i) => (
                            <div key={`tenant-${i}`}
                                className='space-between'
                            >
                                <Typography>
                                    {tenant.name}
                                </Typography>
                                <div className='flex-row centered'>
                                    <Typography style={{color: tenant.hasPaid ? "#0f0" : "#f00"}}>
                                        {tenant.hasPaid ? "PAID" : "NOT PAID"}
                                    </Typography>
                                    {tenant.hasPaid
                                        ? <PaidIcon nativeColor={"#0f0"} />
                                        : <UnpaidIcon nativeColor={"#f00"} />}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Collapse>
            </Card>
        )
    }
}

export default withStyles(styles)(RentDashboardCard)