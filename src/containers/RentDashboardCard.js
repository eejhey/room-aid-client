import React from 'react';
import classNames from 'classnames';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PaidIcon from '@material-ui/icons/Check';
import UnpaidIcon from '@material-ui/icons/Close';
import { Transition } from 'react-spring/renderprops';
import {
    Card,
    CardContent,
    Typography,
    CardActionArea,
    IconButton,
    Collapse,
    withStyles,
} from '@material-ui/core';

const styles = theme => ({
    card: {
        flexGrow: '0',
        '@media (max-width: 399px)': {
            marginBottom: theme.spacing.unit,
            width: '80%',
        },
        '@media (min-width: 400px)': {
            marginRight: theme.spacing.unit,
        },
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
        const { classes } = this.props;
        const { expanded } = this.state;

        const tenants = [
            { name: 'Eddie', hasPaid: true },
            { name: 'Eddie', hasPaid: true },
            { name: 'Eddie', hasPaid: true },
            { name: 'Eddie', hasPaid: false },
            { name: 'Eddie', hasPaid: false },
            { name: 'Eddie', hasPaid: false },
            { name: 'Eddie', hasPaid: false },
        ]

        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant='subtitle2'>
                        RENT
                    </Typography>
                    <Typography variant='h5'>
                        $3600.00
                                </Typography>
                    <Typography variant='caption'>
                        Due By 05/31/2019
                                </Typography>
                </CardContent>
                <CardActionArea
                    onClick={() => this.setState({ expanded: !expanded })}>
                    <div className='space-between'>
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
                                <div className='flex-row flex-center-children'>
                                    <Typography style={{color: tenant.hasPaid ? "#0f0" : "#f00"}}>
                                        {tenant.hasPaid ? "PAID" : "OWES"}
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

// @ts-ignore
export default withStyles(styles)(RentDashboardCard)