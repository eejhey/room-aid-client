import React from 'react';
import { Keyframes } from 'react-spring/renderprops';
import classNames from 'classnames';
import {
    Card,
    CardContent,
    Typography,
    withStyles,
    withTheme,
    CardActionArea,
    Grow,
    RootRef,
} from '@material-ui/core';
import RentDashboardCard from '../containers/RentDashboardCard';
import { Query } from 'react-apollo';
import PrimaryHouseQuery from '../graphql/queries/get-primary-household';

const styles = theme => ({
    root: {
        display: 'flex',
        flexFlow: 'column nowrap',
        height: '100%',
        width: '100%',
        boxSizing: 'border-box',
        padding: theme.spacing.unit,
        alignItems: 'center',
        position: 'relative',
        overflow: 'auto',
        // '@media (min-width: 400px)': {
        //     alignItems: 'flex-start',
        // },
    },
    cardViewer: {
        position: 'absolute',
        zIndex: '1',
    },
    topCards: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'inherit',
        width: '100%',
        // '@media (max-width: 399px)': {
        // },
        // '@media (min-width: 400px)': {
        //     flexFlow: 'row nowrap',
        // }
    },
    card: {
        flexGrow: '0',
        opacity: '1',
        marginBottom: theme.spacing.unit,
        width: '80%',
        maxWidth: '300px',
        // '@media (max-width: 399px)': {
        // },
        // '@media (min-width: 400px)': {
        //     marginRight: theme.spacing.unit,
        // },
    },
    cardTapped: {
        width: '100%',
        flexGrow: '1',
    },
    cardCollapsed: {
        opacity: '0',
    },
})

export class Briefing extends React.PureComponent {

    state = {
        selectedCard: null,
        attachCard: false,
        growCard: false,
        shrinkCard: false,
    }

    constructor(props) {
        super(props);
        this.lastSelectedCard = null;
        this.cardRefs = {}
        this.rootRef = React.createRef();
    }

    closeCard = () => {
        this.setState({ shrinkCard: true, selectedCard: null });
        this.props.onCardClose && this.props.onCardClose();
    }

    isAnimating = () => {
        return this.state.shrinkCard || this.state.growCard;
    }

    onClickCard = (event, cardDetails = null) => {
        if (this.isAnimating()) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        if (cardDetails === null) {
            this.setState({ selectedCard: null });
            return;
        }
        if (this.state.selectedCard) {
            this.setState({ selectedCard: null });
            return;
        }

        const position = this.cardRefs[cardDetails.category].current.getBoundingClientRect();
        const selectedCard = { ...cardDetails, position }
        this.lastSelectedCard = selectedCard;
        this.setState({ selectedCard, attachCard: true });

        this.props.onCardOpen && this.props.onCardOpen();
    }

    componentDidUpdate() {
        if (!this.state.shrinkCard && this.state.attachCard && !this.state.growCard) {
            this.setState({ growCard: true });
        }

        if (this.state.shrinkCard && this.state.growCard) {
            this.setState({ growCard: false, attachCard: false });
        }
    }

    componentDidMount() {

    }

    render() {
        const { classes } = this.props;
        const {
            growCard,
            shrinkCard,
        } = this.state;

        const billCollections = [
            {
                category: "Utilities",
                balance: 200,
                dueBy: "06/30/2019",
            },
            // {
            //     category: "Payment1",
            //     balance: 150,
            //     dueBy: "04/30/2019",
            // },
        ]

        const utilitiesBillCardContents = (bill) => (
            <CardContent>
                <Typography variant='subtitle2'>
                    {bill.category.toUpperCase()}
                </Typography>
                <Typography variant='h5'>
                    {`$${Number(bill.balance).toFixed(2)}`}
                </Typography>
                <Typography variant='caption'>
                    Due by {bill.dueBy}
                </Typography>
            </CardContent>
        )

        const billCards = billCollections.map((bill) => {
            const renderer = utilitiesBillCardContents;
            const contents = (
                <CardActionArea onClick={e => this.onClickCard(e, { ...bill, renderer })}>
                    {renderer(bill)}
                </CardActionArea>
            );

            this.cardRefs[bill.category] = React.createRef();

            return (
                <RootRef rootRef={this.cardRefs[bill.category]} key={bill.category}>
                    <Card
                        className={
                            classNames(
                                classes.card,)}
                    >
                        {contents}
                    </Card>
                </RootRef>
            )
        })

        const rootPosition = (this.rootRef.current &&
            this.rootRef.current.getBoundingClientRect()) || { bottom: 0, right: 0 };

        const from = {
            top: (this.lastSelectedCard && this.lastSelectedCard.position.top - rootPosition.top) || 0,
            left: (this.lastSelectedCard && this.lastSelectedCard.position.left) || 0,
            bottom: (this.lastSelectedCard && rootPosition.bottom - this.lastSelectedCard.position.bottom) || 0,
            right: (this.lastSelectedCard && rootPosition.right - this.lastSelectedCard.position.right) || 0,
        }

        const to = {
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
        }

        const Attacher = Keyframes.Spring({
            expandToViewport: { from, to },
            implode: { from: to, to: from },
        })

        const onRestAttacher = () => {
            if (shrinkCard) this.setState({ shrinkCard: false, attachCard: false });
        }
        return (
            <div className={classes.root} ref={this.rootRef}>
                <Attacher
                    state={growCard ? "expandToViewport" : "implode"}
                    onRest={onRestAttacher}
                >
                    {style => (
                        <Card className={classes.cardViewer}
                            style={{
                                ...style,
                                zIndex: this.isAnimating() ? '1' : '-1',
                            }}
                            onClick={this.closeCard}
                        >
                            {this.lastSelectedCard && this.lastSelectedCard.renderer(this.lastSelectedCard)}
                        </Card>
                    )}
                </Attacher>
                <div className={classes.topCards}>
                    <Query query={PrimaryHouseQuery}>
                        {({ loading, error, data }) => {
                            if (loading) return null;
                            if (error) return null;
                            const { primaryHousehold } = data;
                            return (
                                <Grow>
                                    <RentDashboardCard
                                        rentBalance={primaryHousehold.rent}
                                        dueDate={primaryHousehold.rentDueDate} />
                                </Grow>
                            )
                        }}
                    </Query>
                    {billCards}
                </div>
            </div>
        )
    }
}

// @ts-ignore
export default withTheme()(withStyles(styles)(Briefing))