
import React, { Component } from "react";

import "./styles.scss";

export const Skeleton = ({ count = 1, color = '#f4f4f4' }) => {
    const preLoader = () => {
        let preloaders = [];
        let elementStyle = {
            'background': 'linear-gradient(to right, ' + color + ', #f7f7f7)'
        };
        for (let index = 0; index < 3; index++) {
            preloaders.push(<div key={index} className="element" style={elementStyle}></div>)
        }
        return preloaders;
    }
    const loaderRows = () => {
        const rows = [];
        for (let index = 0; index < count; index++) {
            rows.push(
                <div key={index} className="skeleton">
                    {preLoader()}
                </div>
            );
        }
        return rows;
     }
    return (
        <div>{loaderRows()}</div>
    )

  
}