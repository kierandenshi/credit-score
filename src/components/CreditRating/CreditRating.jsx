import React from 'react';
import PropTypes from 'prop-types';
import RadialChart from '@components/RadialChart';
import './_CreditRating.scss';

const CreditRating = ({ data }) => {
    const { minScoreValue, maxScoreValue, score } = data;

    return (
        <div className={'credit-rating'}>
            <div className={'credit-rating__chart'}>
                <RadialChart
                    minValue={minScoreValue}
                    maxValue={maxScoreValue}
                    value={score}
                />
            </div>
            <div className={'credit-rating__info'}>
                <span>Your credit rating is</span>
                <span className={'strong'}>{score}</span>
                <span>{`out of ${maxScoreValue}`}</span>
            </div>
        </div>
    );
};

CreditRating.propTypes = {
    data: PropTypes.shape({}).isRequired,
};

export default CreditRating;
