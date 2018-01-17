import React from 'react';
import PropTypes from 'prop-types';
import { localise } from '@environment';
import './_LongTermDebt.scss';

const LongTermDebt = ({ data }) => {
    const { currentLongTermDebt, currentLongTermCreditLimit } = data;

    return (
        <div className={'long-term-debt'}>
            <div className={'long-term-debt__info'}>
                <span>Your long term debt total</span>
                <span>{localise.currency(currentLongTermDebt)}</span>
                <span>{`Total credit limit ${currentLongTermCreditLimit || 0}`}</span>
            </div>
        </div>
    );
};

LongTermDebt.propTypes = {
    data: PropTypes.shape({}).isRequired,
};

export default LongTermDebt;
