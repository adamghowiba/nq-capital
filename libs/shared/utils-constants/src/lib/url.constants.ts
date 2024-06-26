const isDevelopment = process.env['NODE_ENV']?.toString() === 'development';
const isProduction = process.env['NODE_ENV']?.toString() === 'production';

export const generateUrl = (params: {
  stagingUrl?: string;
  productionUrl: string;
  developmentUrl: string;
}) => {
  const url =
    (isProduction
      ? params.productionUrl
      : isDevelopment
      ? params.developmentUrl
      : params.stagingUrl) || params.developmentUrl;

  return new URL(url);
};

export const DOMAIN_HOST = 'saber.dev';

export const API_URL = generateUrl({
  developmentUrl: 'http://localhost:5000/graphql',
  productionUrl: 'https://api.saber.dev/graphql',
});

export const INVESTORS_PORTAL_URL = generateUrl({
  developmentUrl: 'http://localhost:4200',
  productionUrl: 'https://client.saber.dev',
});

export const BACKOFFICE_URL = generateUrl({
  developmentUrl: 'http://localhost:4400',
  productionUrl: 'https://office.saber.dev',
});
