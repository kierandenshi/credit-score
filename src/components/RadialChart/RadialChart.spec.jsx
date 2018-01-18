import React from 'react';
import { shallow } from 'enzyme';
import RadialChart from './RadialChart.jsx';

describe('RadialChart component', () => {
    const wrapper = shallow(<RadialChart />);
    it('should render', () => {
        expect(wrapper.find('.radial-chart')).toMatchSnapshot();
    });
});
