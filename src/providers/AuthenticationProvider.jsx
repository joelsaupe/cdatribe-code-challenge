import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag'

import { Form, Input, Section, Container, Button } from '../components'

const useLogin = () => {
  const [login, meta] = useMutation(gql`
    mutation ($c: AuthProviderCredentialsInput) {
      loginUser(credentials: $c) {
        token
        user {
          email
          roles {
          name
          }
        }
      }
    }
  `,
  { errorPolicy: 'ignore', onError: () => {} });

  return [
    form => login({ variables: { c: form }}),
    meta,
  ]
}

const Login = ({ onSuccess }) => {
  const [login, meta] = useLogin()

  React.useEffect(() => {
    if (meta.data && meta.data.loginUser && typeof onSuccess === 'function') {
      onSuccess(meta.data.loginUser)
    }
  }, [meta.data, onSuccess])

  return (
    <Section>
      <Container>
        <Form onSubmit={login} loading={meta.loading}>
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

export const AuthenticationContext = React.createContext({})

export const useAuthenticationContext = () => React.useContext(AuthenticationContext)

export const AuthenticationProvider = props => {
  const [token, setToken] = React.useState(window.sessionStorage.getItem('cdatribe:token'))

  const onLogin = ({ token }) => {
    window.sessionStorage.setItem('cdatribe:token', token)
    setToken(token)
  }

  if (!token) {
    return <Login onSuccess={onLogin} />
  }

  return <AuthenticationContext.Provider {...props} value={token} />
}
