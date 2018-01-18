import React from 'react';
import { shallow } from 'enzyme';
import { getProps, updateProps } from '@test/helpers';
import { CreditReport } from './CreditReport.jsx';

const initialProps = {
    hasData: false,
    data: {},
    fetchReportBegin: jest.fn(),
    getReportData: jest.fn(),
};

const nextProps = {
    hasData: true,
};

describe('Credit report component', () => {
    const wrapper = shallow(<CreditReport {...getProps(initialProps)} />);

    it('should render', () => {
        expect(wrapper.find('.credit-report')).toMatchSnapshot();
    });

    it('should render a loading message', () => {
        expect(wrapper.find('.credit-report__loading-spinner')).toHaveLength(1);
        expect(wrapper.find('.credit-report__report-pages')).toHaveLength(0);
    });

    it('should render the report pages', () => {
        updateProps(wrapper, initialProps, nextProps);
        expect(wrapper.find('.credit-report__loading-spinner')).toHaveLength(0);
        expect(wrapper.find('.credit-report__report-pages')).toHaveLength(1);
    });
});
