import _merge from 'lodash/merge';

export const getProps = (initialProps = {}, additionalProps = {}) =>
    _merge({}, initialProps, additionalProps);

export const updateProps = (wrapper, initialProps = {}, additionalProps = {}) => {
    wrapper.setProps(getProps(initialProps, additionalProps));
};
