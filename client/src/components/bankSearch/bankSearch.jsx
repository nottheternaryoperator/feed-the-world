// bankSearch.jsx
import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_BANK } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { saveBankNames, getSavedBankNames } from '../../utils/localStorage';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import { CardContent, CardActions, Typography } from '@mui/material';
import './bankSearch.css';

const BankSearch = () => {
  const [searchedBanks, setSearchedBanks] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [savedBankNames, setSavedBankNames] = useState(getSavedBankNames());
  const [saveBank, { error }] = useMutation(SAVE_BANK);

  useEffect(() => {
    return () => saveBankNames(savedBankNames);
  });

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (!searchInput) {
      return false;
    }

    try {
      const response = await fetch(
        `https://www.givefood.org.uk/api/2/foodbanks/search/?address=${searchInput}`
      );
      if (!response.ok) {
        throw new Error('API response error');
      }

      const results = await response.json();

      const bankData = results.map((bank) => ({
        name: bank.name,
        address: bank.address,
        needs: bank.needs.needs,
        phone: bank.phone,
        email: bank.email,
        link: bank.urls.homepage,
      }));
      setSearchedBanks(bankData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  const saveBankHandler = async (name) => {
    const bankToSave = searchedBanks.find((bank) => bank.name === name);

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      setSavedBankNames([...savedBankNames, bankToSave.name]);
      const { data } = await saveBank({
        variables: { input: { ...bankToSave } },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bank-search-panel">
      <Container maxWidth="sm">
        <form onSubmit={formSubmitHandler} className="search-bar">
          <TextField
            type="text"
            placeholder="Postcode"
            variant="outlined"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button type="submit">Submit</Button>
        </form>

        <div className="search-results">
          {searchedBanks.map((bank) => (
            <Card key={bank.name} className="card">
              <CardContent>
                <Typography>Name: {bank.name}</Typography>

                <Typography>Address: {bank.address}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  disabled={savedBankNames?.some(
                    (savedBankNames) => savedBankNames === bank.name
                  )}
                  size="small"
                  onClick={() => saveBankHandler(bank.name)}
                >
                  {savedBankNames?.some(
                    (savedBankNames) => savedBankNames === bank.name
                  )
                    ? 'saved to favourites!'
                    : 'Save me to favourites!'}
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default BankSearch;
