// Mocks all files ending in `.vue` showing them as plain Vue instances
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module 'apollo-*' {
  export { ApolloClient as default } from '@apollo/client/core'
  export * from '@apollo/client/core'
  export * from '@apollo/client/utilities'
}

// declare module 'cross-fetch' {
//     const fetch: ['fetch'];
//     export default fetch;
// }