import React from 'react';
import 'bulma/css/bulma.min.css';

import { ApiProvider, AuthenticationProvider } from './providers'
import { UserDetails } from './UserDetails'

export const App = () => (
  <ApiProvider>
    <AuthenticationProvider>
      <UserDetails />
    </AuthenticationProvider>
  </ApiProvider>
);
