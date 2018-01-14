import React from 'react';
import { shallow } from 'enzyme';
import { getProps } from '@test/helpers';
import CreditRating from './CreditRating.jsx';

const initialProps = {
    data: { minScoreValue: 0, maxScoreValue: 700, score: 450 },
};

describe('CreditRating component', () => {
    const wrapper = shallow(<CreditRating {...getProps(initialProps)} />);

    it('should render', () => {
        expect(wrapper.find('.credit-rating')).toHaveLength(1);
    });
});
