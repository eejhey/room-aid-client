import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
// import LayersIcon from '@material-ui/icons/Layers';

export const options = [
    {title: "Home", icon: <DashboardIcon />},
    {title: "History", icon: <BarChartIcon />},
]

export const NavigationItems = (props) => {

    const onClick = (index) => {
        props.onNavigationOptionSelect &&
            props.onNavigationOptionSelect(index);
    }

    const navigationItems = options.map((el, i) => (
        <ListItem key={i.toString()}
            button
            onClick={() => onClick(i)}
            disabled={i === props.selectedIndex}
        >
            <ListItemIcon>{el.icon}</ListItemIcon>
            <ListItemText primary={el.title} />
        </ListItem>
    ))

    return navigationItems;
}

NavigationItems.propTypes = {
    onNavigationOptionSelect: PropTypes.func,   // (index)
}