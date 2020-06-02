import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag'


import { Form, Input, Section, Container, Button } from './components'

const useUserDetails = () => useQuery(gql`
  query Self {
    viewer {
      self {
        email
        admin
        roles {
          name
        }
        organizations {
          name
        }
      }
    }
  }
`)

export const UserDetails = () => {
  const { loading, data, error } = useUserDetails()

  console.log({ loading, data, error })

  return 'hi'
}
