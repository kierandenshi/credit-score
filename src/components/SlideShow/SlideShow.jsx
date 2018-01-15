import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    schedule,
    deschedule,
} from '@middleware/scheduledActionMiddleware';
import { showNextSlide } from '@redux/slideshow';
import './_SlideShow.scss';

export class SlideShow extends Component {
    constructor(props) {
        super(props);
        const { children } = props;
        this.slides = children ? children.length : 0;
        this.delay = 10;
    }

    componentDidMount() {
        const { schedule } = this.props; // eslint-disable-line no-shadow
        this.slides > 1 && schedule('slideshowTick', { action: showNextSlide(this.slides), every: this.delay });
    }

    componentWillUnmount() {
        const { deschedule } = this.props; // eslint-disable-line no-shadow
        deschedule('slideshowTick');
    }

    skipSlide = () => {
        const { schedule, deschedule } = this.props; // eslint-disable-line no-shadow
        deschedule('slideshowTick');
        this.props.showNextSlide(this.slides);
        this.slides > 1 && schedule('slideshowTick', { action: showNextSlide(this.slides), every: this.delay });
    }

    render() {
        const { children, currentSlide } = this.props;

        return (
            /* eslint-disable */
            <div className={'slide-show'} onClick={this.skipSlide}> 
                {children && children[currentSlide]}
            </div>
            /* eslint-enable */
        );
    }
}

SlideShow.defaultProps = {
    children: null,
};

SlideShow.propTypes = {
    children: PropTypes.node,
    currentSlide: PropTypes.number.isRequired,
    schedule: PropTypes.func.isRequired,
    deschedule: PropTypes.func.isRequired,
    showNextSlide: PropTypes.func.isRequired,
};

export default connect(
    state => ({
        currentSlide: state.slideshow.currentSlide,
    }),
    {
        schedule,
        deschedule,
        showNextSlide,
    },
)(SlideShow);
