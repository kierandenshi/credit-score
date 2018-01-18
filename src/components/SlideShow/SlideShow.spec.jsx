import React from 'react';
import { shallow } from 'enzyme';
import { getProps, updateProps } from '@test/helpers';
import { showNextSlide } from '@redux/slideshow';
import { SlideShow } from './SlideShow.jsx';

const props = {
    currentSlide: 0,
    children: [<div id="child1" />, <div id="child2" />],
    schedule: jest.fn(),
    deschedule: jest.fn(),
    showNextSlide: jest.fn(),
};

describe('SlideShow component', () => {
    const wrapper = shallow(<SlideShow {...getProps(props)} />);
    const { slides, delay } = wrapper.instance();

    it('should render', () => {
        expect(wrapper.find('.slide-show')).toMatchSnapshot();
    });

    it('should start the animation scheduler', () => {
        expect(props.schedule).toHaveBeenCalledWith(
            'slideshowTick',
            { action: showNextSlide(slides), every: delay },
        );
    });

    it('should render the correct child element', () => {
        expect(wrapper.find('#child1')).toHaveLength(1);
        updateProps(wrapper, props, { currentSlide: 1 });
        expect(wrapper.find('#child2')).toHaveLength(1);
    });

    it('should skip to next slide on click', () => {
        wrapper.simulate('click');
        expect(props.deschedule).toHaveBeenCalledWith('slideshowTick');
        expect(props.schedule).toHaveBeenCalledWith(
            'slideshowTick',
            { action: showNextSlide(slides), every: delay },
        );
        expect(props.showNextSlide).toHaveBeenCalled();
    });
});
