import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import clientGraphql from './client.graphql';
import { ApolloProvider } from '@apollo/client';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={clientGraphql}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
