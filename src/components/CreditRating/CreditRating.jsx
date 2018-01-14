import React from 'react';
import PropTypes from 'prop-types';
import RadialChart from '@components/RadialChart';
import './_CreditRating.scss';

const CreditRating = ({ data }) => {
    const { minScoreValue, maxScoreValue, score } = data;

    return (
        <div className={'credit-rating'}>
            <RadialChart
              minValue={minScoreValue}
              maxValue={maxScoreValue}
              value={score}
            />
        </div>
    );
};

CreditRating.propTypes = {
    data: PropTypes.shape().isRequired,
};

export default CreditRating;
