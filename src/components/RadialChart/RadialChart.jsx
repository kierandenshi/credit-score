import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import './_RadialChart.scss';

const RadialChart = ({
    maxValue,
    value,
    children,
}) => {
    // Radius = (size / 2) - (stroke / 2)
    // Circumference = 2 * π * Radius
    // The length of the offset is inversely proportional to the amount of progress.
    // So to display 60 % progress, the offset as 40 % of the circumference.
    const perc = value / maxValue;

    const size = 320;
    const stroke = 8;
    const radius = (size / 2) - (stroke / 2);
    const dashArray = (2 * Math.PI * radius);
    const dashOffset = (2 * Math.PI * radius) * (1 - perc);


    const fill = keyframes`
        0% {
            stroke-dashoffset: ${dashArray};
        }
        100% {
            stroke-dashoffset: ${dashOffset};
        }
    `;

    const AnimatedChart = styled.svg`
        transform: rotate(-90deg);
        & circle {
            stroke-dasharray: ${dashArray};
            animation: ${fill} 2s forwards;
        }
    `;

    return (
        <div className={'radial-chart'}>
            <AnimatedChart width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill={'none'}
                    strokeWidth={stroke}
                />
            </AnimatedChart>
        </div>
    );
};

RadialChart.defaultProps = {
    children: null,
};

RadialChart.propTypes = {
    maxValue: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    children: PropTypes.node,
};

export default RadialChart;
