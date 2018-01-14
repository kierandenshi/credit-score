import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    fetchReportBegin,
    getReportData,
} from '@redux/report';
import CreditRating from '@components/CreditRating';

export class CreditReport extends Component {
    componentDidMount() {
        this.props.fetchReportBegin();
    }

    render() {
        const { data, hasData } = this.props;
        console.log(data);

        return hasData ? (
            <div className={'credit-report'}>
                <h1>Your report</h1>
                <CreditRating data={data} />
            </div>
        ) : (
            <div>Loading</div>
        );
    }
}

CreditReport.propTypes = {
    hasData: PropTypes.bool.isRequired,
    data: PropTypes.shape().isRequired,
    fetchReportBegin: PropTypes.func.isRequired,
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
