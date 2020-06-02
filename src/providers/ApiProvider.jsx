import React from 'react';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from '@apollo/react-hooks';

// Instantiate required constructor fields
const cache = new InMemoryCache();

const httpLink = createHttpLink({
  uri: "https://staging.selfdetermine.net/graphql",
  credentials: "omit",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = window.sessionStorage.getItem('cdatribe:token');

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
});

export const ApiProvider = props => <ApolloProvider {...props} client={client} />;
