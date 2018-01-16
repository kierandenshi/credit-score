import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Transition from 'react-transition-group/Transition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import {
    schedule,
    deschedule,
} from '@middleware/scheduledActionMiddleware';
import { showNextSlide } from '@redux/slideshow';
import './_SlideShow.scss';

const SlideTransition = ({ children, duration, in: inProp }) => {
    const defaultStyle = {
        transition: `${duration}ms`,
        transitionProperty: 'left',
        position: 'absolute',
    };

    const transitionStyles = {
        entering: { left: '414px' },
        entered: { left: '0px' },
        exiting: { left: '-414px' },
        exited: { left: '0px' },
    };

    return (
        <Transition
            in={inProp}
            timeout={{
                enter: duration,
                exit: duration,
            }}
        >
            {
                (status) => {
                    if (status === 'exited') {
                        return null;
                    }
                    return React.cloneElement(children, {
                        style: { ...defaultStyle, ...transitionStyles[status] },
                    });
                }
            }
        </Transition>
    );
};

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
            <div className={'slide-show'} onClick={this.skipSlide} ref={(e) => { this.container = e; }}>
                <TransitionGroup>
                    <SlideTransition in key={`slide${currentSlide}`} duration={500}>
                        <div>{children[currentSlide]}</div>
                    </SlideTransition>
                </TransitionGroup>
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
