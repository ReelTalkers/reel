import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import Welcome from './welcome.js'
import Home from './home.js';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://reeltalk.student.cwru.edu:3000/graphql',
    opts: {
      credentials: 'include',
    },
  }),
})

ReactDOM.render((
  <ApolloProvider client={client}>
    <Router>
      <Route path='/' component={Welcome} />
    </Router>
  </ApolloProvider>
  ),
  document.getElementById('root')
)
