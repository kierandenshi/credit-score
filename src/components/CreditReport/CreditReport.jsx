import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    fetchReportBegin,
    getReportData,
} from '@redux/report';
import CreditRating from '@components/CreditRating';
import './_CreditReport.scss';

export class CreditReport extends Component {
    componentDidMount() {
        this.props.fetchReportBegin();
    }

    renderReportPages() {
        const { data } = this.props;

        return (
            <div className={'credit-report__report-pages'}>
                <CreditRating data={data} />
            </div>
        );
    }

    renderReportLoading() {
        return (
            <div className={'credit-report__loading-spinner'}>Loading</div>
        );
    }

    render() {
        const { hasData } = this.props;

        return (
            <div className={'credit-report'}>
                <div className={'credit-report__main-section'}>
                    { hasData ? this.renderReportPages() : this.renderReportLoading() }
                </div>
            </div>
        );
    }
}

CreditReport.defaultProps = {
    data: {},
};

CreditReport.propTypes = {
    fetchReportBegin: PropTypes.func.isRequired,
    hasData: PropTypes.bool.isRequired,
    data: PropTypes.shape({}),
};

export default connect(
    state => ({
        hasData: state.report.hasData,
        data: getReportData(state),
    }),
    {
        fetchReportBegin,
    },
)(CreditReport);
