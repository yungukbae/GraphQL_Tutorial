import React from 'react';
import './index.css'
import ReactDOM from 'react-dom';
import App from './App';
import {setContext} from '@apollo/client/link/context'
import { BrowserRouter } from 'react-router-dom';

// 1 라이브러리 임포트 
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';

// 2 서버 링크 설정
const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
});

const authLink = setContext((_, {headers}) => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTYzNzczNzQ2NX0.KfDuUT2j8yZmsj79GyS1h8HBcATwjxLGzT8kHNZarXs';
  return{
    headers:{
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

// 3 클라이언트와 서버 연결
const client = new ApolloClient({
  link: authLink.concat(httpLink),
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