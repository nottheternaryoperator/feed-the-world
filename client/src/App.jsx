// App.jsx
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import BankSearch from './components/bankSearch/bankSearch.jsx';
import AppNavbar from './components/form/Navbar.jsx';
import Footer from './components/footer/footer.jsx';
import './App.css'; // Import the CSS file

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
  return (
    <ApolloProvider client={client}>
      <div className="app-container">
        <AppNavbar />
        <div className="content-container">
          {/* Add other components here */}
          <BankSearch />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
