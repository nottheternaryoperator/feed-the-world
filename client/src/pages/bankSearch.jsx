import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
// import { SAVE_BANK } from '../utils/mutations';
import Auth from '../utils/auth';
// import { FormControl } from '@mui/base/FormControl';
import TextField from '@mui/material/TextField';
import { FormControl, FormLabel } from '@mui/material';
import Button from '@mui/material/Button';

const BankSearch = () => {
  // const [searchedBanks, setSearchedBanks] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  //   const [savedBankIds, setSavedBankIds] = useState(getSavedBankIds());
  //   const [saveBank, { error }] = useMutation(SAVE_BANK);

  // useEffect(() => {
  //   return () => savedBankIds(savedBankIds);
  // });

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    console.log('it works');
    if (!searchInput) {
      return false;
    }

    try {
      const response = await fetch(
        `https://www.givefood.org.uk/api/2/foodbanks/search/?address=${searchInput}` //put API in here
      );
      if (!response.ok) {
        throw new Error('API response error');
      }

      const { results } = await response.json();

      const bankData = results.map((bank) => ({
        // bankId: bank.id,
        name: bank.name,
        address: bank.address,
        needs: bank.needs || ["This foodbank hasn't posted any needed items."],
        phone: bank.phone || ['no phone number available.'],
        email: bank.email || ['no email address available.'],
        link: bank.urls.homepage || ['no website address available'],
      }));
      console.log(bankData);
      // setSearchedBanks(bankData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      test
      <FormControl
        onSubmit={formSubmitHandler}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      >
        <form>
          <FormLabel>Postcode</FormLabel>
          <TextField type="text" variant="outlined" />
          <Button type="submit">Submit</Button>
        </form>
      </FormControl>
    </>
  );
};

export default BankSearch;
