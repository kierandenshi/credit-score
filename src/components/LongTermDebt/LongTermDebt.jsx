import React from 'react';
import PropTypes from 'prop-types';
import { localise } from '@environment';
import './_LongTermDebt.scss';

const LongTermDebt = ({ data }) => {
    const { currentLongTermDebt } = data;

    return (
        <div className={'long-term-debt'}>
            {localise.currency(currentLongTermDebt)}
        </div>
    );
};

LongTermDebt.propTypes = {
    data: PropTypes.shape({}).isRequired,
};

export default LongTermDebt;
