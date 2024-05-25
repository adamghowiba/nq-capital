import type { CodegenConfig } from '@graphql-codegen/cli';
import type { ReactQueryRawPluginConfig } from '@graphql-codegen/typescript-react-query/typings/config';

const REACT_QUERY_PLUGIN_CONFIG: ReactQueryRawPluginConfig = {
  exposeQueryKeys: true,
  dedupeFragments: true,
  exposeDocument: true,
  reactQueryVersion: 5,
  exposeFetcher: true,
  // allowEnumStringTypes: true,
  fetcher: {
    // TODO: use the URL from url constants
    // endpoint: process.env.API_GQL_URL as string,
    func: './fetcher#gqlFetcher',
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
  generates: {
    './lib/gql/gql-client.ts': {
      documents: ['./lib/api/**/*.gql'],
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
    //   documents: ['./pages/**/*.tsx', './lib/api/**/*.gql'],
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
