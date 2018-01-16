const locales = {
    'en-GB': {
        currency: 'GBP',
    },
    'en-US': {
        currency: 'USD',
    },
    'en-ZA': {
        currency: 'ZAR',
    },
};

export const format = locale => ({
    number: n => n.toLocaleString(locale),
    currency: n => n.toLocaleString(locale, { style: 'currency', currency: locales[locale].currency }),
});
