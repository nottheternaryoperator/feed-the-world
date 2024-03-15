import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_BANK } from '../utils/mutations';
import Auth from '../utils/auth';

const BankSearch = () => {
  const [searchedBanks, setSearchedBanks] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [savedBankIds, setSavedBankIds] = useState(getSavedBankIds());
  const [saveBank, { error }] = useMutation(SAVE_BANK);

  useEffect(() => {
    return () => savedBankIds(savedBankIds);
  });

  const formSubmitHandler = async (event) => {
    event.preventDefault();

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

      setSearchedBanks(bankData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };
};
