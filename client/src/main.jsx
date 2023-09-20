import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// import { ApolloProvider } from '@apollo/client'
import Login from './Login.jsx'
import SuccessLogin from './SuccessLogin.jsx';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store.js';
import Dashboard from './Dashboard.jsx';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider } from '@apollo/client';
import client from './services/apolloClient.js';
import Role from './Role.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/login/success",
    element: <SuccessLogin />,
  },
  {
    path: "/login/error",
    element: <h1>Error Login</h1>,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/role",
    element: <Role />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <Provider store={store}>
      <ApolloProvider client={client}>
        <PersistGate persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
)
