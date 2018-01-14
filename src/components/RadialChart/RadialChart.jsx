import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './_RadialChart.scss';

class RadialChart extends Component {
    componentDidMount() {
        const { value, maxValue } = this.props;
        const r = (180 / 100) * ((value / maxValue) * 100);
        setTimeout(() => {
            this.fullMask.style.transform = `rotate(${r}deg)`;
            this.fullMaskFill.style.transform = `rotate(${r}deg)`;
            this.halfMaskFill.style.transform = `rotate(${r}deg)`;
            this.halfMaskFillFix.style.transform = `rotate(${r * 2}deg)`;
        }, 1000);
    }

    render() {
        return (
            <div className={'radial-chart'}>
                <div className={'circle'}>
                    <div className={'mask full'} ref={(e) => { this.fullMask = e; }}>
                        <div className={'fill'} ref={(e) => { this.fullMaskFill = e; }} />
                    </div>
                    <div className={'mask half'}>
                        <div className={'fill'} ref={(e) => { this.halfMaskFill = e; }} />
                        <div className={'fill fix'} ref={(e) => { this.halfMaskFillFix = e; }} />
                    </div>
                </div>
                <div className={'inset'}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

RadialChart.defaultProps = {
    children: null,
};

RadialChart.propTypes = {
    maxValue: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    children: PropTypes.node,
};

export default RadialChart;
