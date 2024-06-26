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
  schema: '../../../../../schema.gql',
  documents: ['./requests/**/*.gql'],
  watch: './requests/**/*.gql',
  generates: {
    './gql-client.ts': {
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
    // Preset version is recommended, but was having issues adopting. Commented out for now @adamghowiba
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
