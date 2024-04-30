const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';
const isStaging =
  process.env.APP_ENV === 'staging' && process.env.NODE_ENV === 'production';

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

export const API_URL = generateUrl({
  developmentUrl: 'http://localhost:5000/graphql',
  productionUrl: 'https://api.saber.dev/graphql',
});

export const INVESTORS_PORTAL_URL = generateUrl({
  developmentUrl: 'http://localhost:4200',
  productionUrl: 'https://saber.dev',
});
