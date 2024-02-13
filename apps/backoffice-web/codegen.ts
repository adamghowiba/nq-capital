import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: '../../schema.gql',
  documents: ['src/api/**/*.gql', 'src/api/**/*.ts', '!src/gql/**/*'],
  generates: {
      './src/api/gql/': {
      preset: 'client',
      presetConfig: {
        enumAsTypes: true,
        fragmentMasking: { unmaskFunctionName: 'getFragmentData' }
      }
    },
    // './src/api/gql-client.ts': {
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
  },
  // CLient preset approach
  // generates: {
  //   './src/api/gql/': {
  //     preset: 'client',
  //     presetConfig: {
  //       enumAsTypes: true,
  //       fragmentMasking: { unmaskFunctionName: 'getFragmentData' }
  //     }
  //   }
  // }
};

export default config;
