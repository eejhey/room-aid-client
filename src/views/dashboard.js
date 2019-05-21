import React from 'react';
import classNames from 'classnames';
import { withStyles, createMuiTheme, MuiThemeProvider, Fade } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Hidden from '@material-ui/core/Hidden';
import { options, NavigationItems } from '../containers/HamburgerHelper';
import Balances from './balances';
import Briefing from './briefing';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
        width: '100vw',
        height: '100vh',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    visiblePayload: {
        flex: '1 1 0',
        // height: '0',
    },
    content: {
        flexGrow: 1,
        display: 'flex',
        flexFlow: 'column nowrap',
        height: '100vh',
        overflow: 'hidden',
        boxSizing: 'border-box',
        backgroundColor: '#BCEDF6',
    },
})

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    }
})

export class Dashboard extends React.Component {
    state = {
        open: false,
        page: 0,
        hideToolbar: false,
    }

    onCardOpen = () => {
        this.setState({ hideToolbar: true });
    }

    onCardClose = () => {
        this.setState({ hideToolbar: false });
    }

    pages = [
        <Briefing />,
        <Balances />,
    ]

    onNavigationOptionSelect = (index) => {
        if (this.state.page !== index) {
            this.setState({ page: index })
        }
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes = {} } = this.props;

        const {
            page,
            hideToolbar,
        } = this.state;

        const drawer = (
            <>
                <NavigationItems />
            </>
        );

        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.root}>
                
                <Fade in={!hideToolbar}>
                    <AppBar
                        position="absolute"
                        className={classNames(classes.appBar)}
                        // className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
                    >
                        <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.handleDrawerOpen}
                                className={classNames(
                                    classes.menuButton,
                                    this.state.open && classes.menuButtonHidden,
                                )}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                className={classes.title}
                            >
                                {options[page].title}
                            </Typography>
                            {/* <IconButton color="inherit">
                                <Badge badgeContent={4} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton> */}
                        </Toolbar>
                    </AppBar>
                </Fade>
                <Hidden smUp implementation="css">
                    <Drawer
                        container={this.props.container}
                        variant="temporary"
                        anchor={'left'}
                        open={this.state.open}
                        onClose={this.handleDrawerOpen}
                    // classes={{
                    //     paper: classes.drawerPaper,
                    // }}
                    >
                        <div className={classes.toolbarIcon}>
                            <IconButton onClick={this.handleDrawerClose}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </div>
                        {drawer}
                    </Drawer>
                </Hidden>
                {/* <Drawer
                    variant="permanent"
                    classes={{
                        paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <NavigationItems 
                            onNavigationOptionSelect={this.onNavigationOptionSelect} 
                            selectedIndex={page} 
                        />
                    </List>
                    <Divider />
                    <List>{secondaryListItems}</List>
                </Drawer> */}
                <main className={classes.content}>
                    <div id="app-bar-spacer" className={classes.appBarSpacer} />
                    <div className={classes.visiblePayload}>
                        {this.pages[page]}
                    </div>
                </main>
            </div>
            </MuiThemeProvider>
        )
    }
}

//@ts-ignore
export default withStyles(styles)(Dashboard);