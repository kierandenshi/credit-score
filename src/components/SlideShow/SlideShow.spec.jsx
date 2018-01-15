import React from 'react';
import { shallow } from 'enzyme';
import { getProps } from '@test/helpers';
import { SlideShow } from './SlideShow.jsx';

const initialProps = {
    currentSlide: 0,
};

describe('SlideShow component', () => {
    const wrapper = shallow(<SlideShow {...getProps(initialProps)} />);

    it('should render', () => {
        expect(wrapper.find('.slide-show')).toHaveLength(1);
    });
});
