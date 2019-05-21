const rewireInlineImportGraphqlAst = require('react-app-rewire-inline-import-graphql-ast');

module.exports = (webpackConfig, env, { paths }) => {
    webpackConfig = rewireInlineImportGraphqlAst(config, env);
    return webpackConfig
}