import React from 'react';
import './link.css';

export default function Link(props) {

    return (
        <div
            className="link"
            style={props.style}>
            {props.children}
        </div>
    )
}