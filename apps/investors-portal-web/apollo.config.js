module.exports = {
  client: {
    service: {
      // includes: [__dirname + '/apps/investors-portal-web/lib/api/**'],
      // url: 'http://localhost:5000/graphql'
      includes: ['*'],
      name: "investors-portal",
      localSchemaFile: `${process.cwd()}/schema.gql`
    },
    // service: "investors-portal",
  }
};
