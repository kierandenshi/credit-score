import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    fetchReportBegin,
    fetchReportCancel,
} from '@redux/report';

export class CreditReport extends Component {
    componentDidMount() {
        this.props.fetchReportBegin();
    }

    render() {
        return (
            <div className={'credit-report'}>Your report</div>
        );
    }
}

CreditReport.propTypes = {
    fetchReportBegin: PropTypes.func.isRequired,
    fetchReportCancel: PropTypes.func.isRequired,
};

export default connect(
    null,
    {
        fetchReportBegin,
        fetchReportCancel,
    },
)(CreditReport);
