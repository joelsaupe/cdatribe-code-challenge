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
  credentials: "include",
});

const client = new ApolloClient({
  cache,
  link,
});

const Login = () => {
  const [login, stuff] = useMutation(LOGIN_USER);

  const handleSubmit = form => {
    console.log({ form })

    login({ variables: form });
  };

  console.log(stuff);

  return (
    <Section>
      <Container>
        <Form onSubmit={handleSubmit}>
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
