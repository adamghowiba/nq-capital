import type { CodegenConfig } from '@graphql-codegen/cli';
import {TypeScriptPluginConfig} from '@graphql-codegen/typescript'

const TYPESCRIPT_CONFIG: TypeScriptPluginConfig = {
  enumsAsTypes: true,
}

const config: CodegenConfig = {
  schema: '../../../schema.gql',
  generates: {
    './src/schema.ts': {
      plugins: ['typescript'],
      config: {
        ...TYPESCRIPT_CONFIG
      },
    },
  },
};

export default config;
