import React from 'react';
import { shallow } from 'enzyme';
import { getProps } from '@test/helpers';
import RadialChart from '@components/RadialChart';
import CreditRating from './CreditRating.jsx';

const initialProps = {
    data: { minScoreValue: 0, maxScoreValue: 700, score: 450 },
};

describe('CreditRating component', () => {
    const wrapper = shallow(<CreditRating {...getProps(initialProps)} />);

    it('should render', () => {
        expect(wrapper.find('.credit-rating')).toMatchSnapshot();
    });

    it('should pass correct props to chart', () => {
        expect(wrapper.find(RadialChart).props().minValue).toEqual(0);
        expect(wrapper.find(RadialChart).props().maxValue).toEqual(700);
        expect(wrapper.find(RadialChart).props().value).toEqual(450);
    });
});
