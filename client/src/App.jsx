// import './App.css';
import { useState } from 'react';
// import Navbar from './components/Navbar/navbar.jsx';
// import LoginForm from './components/login/Login.jsx';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import BankSearch from './pages/bankSearch.jsx';

import AppNavbar from './components/form/Navbar.jsx';

import Footer from './components/footer/footer.jsx';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Set login status to true upon successful login
  };

  return (
    <ApolloProvider client={client}>
      <>
        <AppNavbar />
        <BankSearch />
        {/* <Navbar /> */}
        {/* Conditionally render the LoginForm modal */}
        {/* {!isLoggedIn && <LoginForm onLoginSuccess={handleLoginSuccess} />} */}
        {/* Render other components */}
      </>
      <Footer />
    </ApolloProvider>
  );
}
export default App;
