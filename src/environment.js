import { format } from '@localisation';

export const isDev = () => process.env.NODE_ENV === 'development';
export const isProd = () => process.env.NODE_ENV === 'production';
export const localise = format(process.env.locale || 'en-GB');
