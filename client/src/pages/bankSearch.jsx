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
};
