import type { CodegenConfig } from '@graphql-codegen/cli';
import type { ReactQueryRawPluginConfig } from '@graphql-codegen/typescript-react-query/typings/config';

const REACT_QUERY_PLUGIN_CONFIG: ReactQueryRawPluginConfig = {
  exposeQueryKeys: true,
  exposeFetcher: true,
  dedupeFragments: true,
  exposeDocument: true,
  reactQueryVersion: 5,
  // allowEnumStringTypes: true,
  fetcher: {
    endpoint: process.env.API_GQL_URL as string,
    fetchParams: {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    },
  },
};

const config: CodegenConfig = {
  schema: '../../schema.gql',
  documents: ['lib/api/**/*.(gql|ts)', 'pages/*/**.tsx', 'pages/*.tsx'],
  generates: {
    './lib/gql/gql-client.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-query',
      ],
      config: {
        ...REACT_QUERY_PLUGIN_CONFIG,
        enumsAsTypes: true,
      },
    },
    // './lib/gql/': {
    //   preset: 'client',
    //   presetConfig: {
    //     enumsAsTypes: true,
    //     documentMode: 'string',
    //     fragmentMasking: { unmaskFunctionName: 'getFragmentData' },
    //   },
    // },
  },
};

export default config;
