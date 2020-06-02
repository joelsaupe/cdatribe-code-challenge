import React from 'react';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag'

import 'bulma/css/bulma.min.css';

import { Form, Input, Section, Container, Button } from './components'

const LOGIN_USER = gql`
  mutation ($c: AuthProviderCredentialsInput) {
    loginUser(credentials: $c) {
      user {
        email
        roles {
         name
        }
      }
    }
  }
`;


// Instantiate required constructor fields
const cache = new InMemoryCache();

const link = new HttpLink({
  uri: "https://staging.selfdetermine.net/graphql",
  credentials: "omit",
});

const client = new ApolloClient({
  cache,
  link,
});

const useLogin = () => {
  const [login, meta] = useMutation(LOGIN_USER, { errorPolicy: 'ignore' });

  return [
    form => login({ variables: { c: form }}),
    meta,
  ]
}

const Login = () => {
  const [login, meta] = useLogin()

  console.log(meta);

  return (
    <Section>
      <Container>
        <Form onSubmit={login} {...meta}>
          <Input
            type="email"
            name="email"
            required
            label="Email Address"
            defaultValue="kbighorse+frontend_test@gmail.com"
          />
          <Input
            type="password"
            name="password"
            required
            label="Password"
            defaultValue="coeurdalene"
          />
          <Button type="submit" color="primary">Submit</Button>
        </Form>
      </Container>
    </Section>
  )
};

export const App = () => (
  <ApolloProvider client={client}>
    <Login />
  </ApolloProvider>
);
