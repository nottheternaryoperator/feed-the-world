
import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_BANK } from '../utils/mutations';
import Auth from '../utils/auth';
import { saveBankNames, getSavedBankNames } from '../utils/localStorage';
// import { FormControl } from '@mui/base/FormControl';
import TextField from "@mui/material/TextField";
import {
  CardActionArea,
  FormControl,
  FormLabel,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import "./bankSearch.css";

const BankSearch = () => {
  const [searchedBanks, setSearchedBanks] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [savedBankNames, setSavedBankNames] = useState(getSavedBankNames());
  const [saveBank, { error }] = useMutation(SAVE_BANK);

  useEffect(() => {
    return () => saveBankNames(savedBankNames);
  });

  //function to handle the input form for postcode. it calls the api with the input from the form, and maps the response to bankData object.
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(searchInput);
    if (!searchInput) {
      return false;
    }

    try {
      const response = await fetch(
        `https://www.givefood.org.uk/api/2/foodbanks/search/?address=${searchInput}` //put API in here
      );
      if (!response.ok) {
        throw new Error("API response error");
      }
      console.log(response);

      const results = await response.json();

      console.log(results);

      const bankData = results.map((bank) => ({
        // bankId: bank.id,
        name: bank.name,
        address: bank.address,
        needs: bank.needs.needs || [
          "This foodbank hasn't posted any needed items.",
        ],
        phone: bank.phone || ["no phone number available."],
        email: bank.email || ["no email address available."],
        link: bank.urls.homepage || ["no website address available"],
      }));
      console.log(bankData);
      setSearchedBanks(bankData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }

  };

  // function to save the selected foodbanks to the database
  const saveBankHandler = async (name) => {
    const bankToSave = searchedBanks.find((bank) => bank.name === name);

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await saveBank({
        variables: { input: { ...bankToSave } },
      });

      setSavedBankNames([...savedBankNames, bankToSave.name]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Container maxWidth="sm" className="bank-search-panel">
        <FormControl
          className="search-bar"
          onSubmit={formSubmitHandler}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}>
          <form>
            <TextField type="text" placeholder="Postcode" variant="outlined" />
            <Button type="submit">Submit</Button>
          </form>
        </FormControl>


        <div className="search-results">
          {searchedBanks.map((bank) => (
            <Card key={bank.name} className="card">
              <CardContent>
                <Typography>{bank.name}</Typography>
                <Typography>{bank.address}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Favorite</Button>
              </CardActions>
            </Card>
          ))}
        </div>

      </Container>
    </>
  );
};

export default BankSearch;

