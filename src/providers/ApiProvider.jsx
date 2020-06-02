import React from 'react';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

// Instantiate required constructor fields
const cache = new InMemoryCache();

const link = new HttpLink({
  uri: "https://staging.selfdetermine.net/graphql",
  credentials: "include",
});

const client = new ApolloClient({
  cache,
  link,
});

export const ApiProvider = props => <ApolloProvider {...props} client={client} />;
