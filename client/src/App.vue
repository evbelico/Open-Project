<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script lang="ts">
import * as fetch from 'cross-fetch';
import { defineComponent, provide } from '@vue/composition-api';
import { DefaultApolloClient } from '@vue/apollo-composable';
import {
  ApolloClient,
  createHttpLink,
  HttpLink,
  InMemoryCache
} from '@apollo/client/core';

// const httpLink = createHttpLink({
//   uri: 'http://localhost:4001/graphql',
//   fetch
// });

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  // link: httpLink,
  link: new HttpLink({ uri: 'http://localhost:4001/graphql', fetch }),
  cache
});

export default defineComponent({
  name: 'App',
  setup() {
    provide(DefaultApolloClient, apolloClient);
  }
});
</script>
