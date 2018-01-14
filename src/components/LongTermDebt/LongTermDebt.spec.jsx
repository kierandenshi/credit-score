import React from 'react';
import { shallow } from 'enzyme';
import { getProps } from '@test/helpers';
import LongTermDebt from './LongTermDebt.jsx';

const initialProps = {
    data: { currentLongTermDebt: 253400 },
};

describe('CreditRating component', () => {
    const wrapper = shallow(<LongTermDebt {...getProps(initialProps)} />);

    it('should render', () => {
        expect(wrapper.find('.long-term-debt')).toHaveLength(1);
    });
});
