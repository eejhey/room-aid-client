import React from 'react';
import PropTypes from 'prop-types';

export function H1(props) {
    return (
        <div
            style={{
                fontSize: "2rem"
            }}>
            {props.children}   
        </div>
    )
}

export function Text(props) {
    return (
        <div
            style={{
                fontSize: props.size,
                color: props.color,
                margin: props.margin,
            }}>
            {props.children}
        </div>
    )
}

Text.propTypes = {
    size: PropTypes.string,
    color: PropTypes.string,
    margin: PropTypes.string,
}