import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: '../../schema.gql',
  documents: ['lib/api/**/*.(gql|ts)', 'pages/*/**.tsx', 'pages/*.tsx'],
  generates: {
    // './gql/gql-client.ts': {
    //   plugins: [
    //     'typescript',
    //     'typescript-operations',
    //     'typescript-react-query',
    //   ],
    //   config: {
    //     exposeQueryKeys: true,
    //     exposeFetcher: true,
    //     withMutationFn: true,
    //     withHooks: true,
    //     dedupeFragments: true,
    //     reactQueryVersion: 5,
    //     fetcher: {
    //       endpoint: process.env.API_GQL_URL,
    //       fetchParams: {
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         credentials: 'include',
    //       },
    //     },
    //   },
    // },

    './lib/gql/': {
    preset: 'client',
    presetConfig: {
      enumAsTypes: true,
      fragmentMasking: { unmaskFunctionName: 'getFragmentData' }
    }
    },
  },
};

export default config;
