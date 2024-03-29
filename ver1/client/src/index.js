import React from 'react';
import './index.css'
import ReactDOM from 'react-dom';
import App from './App';
import {setContext} from '@apollo/client/link/context'
import { BrowserRouter } from 'react-router-dom';
import { AUTH_TOKEN } from './constants';
import { split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

// 1 라이브러리 임포트 
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem(AUTH_TOKEN)
    }
  }
});

// 2 서버 링크 설정
const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
});

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return{
    headers:{
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return (
      kind === 'OperationDefinition' &&
      operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

// 3 클라이언트와 서버 연결
const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

// 4 렌더링!
ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);