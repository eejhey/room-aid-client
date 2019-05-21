import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

export default function Button(props) {
    const {
        width,
        height,
        onClick,
    } = props;

    return (
        <button
            className="button"
            onClick={onClick}
            style={{
                width,
                height,
            }}>
            {props.children}   
        </button>
    )
}

Button.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
}