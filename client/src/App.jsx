// App.jsx
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import BankSearch from './components/bankSearch/bankSearch.jsx';
import AppNavbar from './components/form/Navbar.jsx';
import Footer from './components/footer/footer.jsx';
import './App.css'; // Import the CSS file
import SavedBanks from './pages/savedBanks.jsx';

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
          {/* Bank Search Container */}
          <div className="bank-search-container">
            <BankSearch />
          </div>
          {/* Saved Banks Container */}
          <div className="saved-banks-container">
            <SavedBanks />
          </div>
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}


export default App;
