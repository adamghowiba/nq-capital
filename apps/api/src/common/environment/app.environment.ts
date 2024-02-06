export const isDevelopment = process.env['NODE_ENV'] === 'development';
export const isProduction = process.env['NODE_ENV'] === 'production';
export const isStaging = process.env['APP_ENV'] === 'staging';

export class AppEnvironment {}
