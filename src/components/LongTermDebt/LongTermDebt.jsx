import React from 'react';
import PropTypes from 'prop-types';
import { localise } from '@environment';
import './_LongTermDebt.scss';

const LongTermDebt = ({ data }) => {
    const { currentLongTermDebt } = data;

    return (
        <div className={'long-term-debt'}>
            <div className={'long-term-debt__inner'}>
                {localise.currency(currentLongTermDebt)}
            </div>
        </div>
    );
};

LongTermDebt.propTypes = {
    data: PropTypes.shape({}).isRequired,
};

export default LongTermDebt;
