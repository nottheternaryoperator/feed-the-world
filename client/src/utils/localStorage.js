export const getSavedBankNames = () => {
  const savedBankNames = localStorage.getItem('saved_banks')
    ? JSON.parse(localStorage.getItem('saved_banks'))
    : [];

  return savedBankNames;
};

export const saveBankName = (bankIdArr) => {
  if (bankIdArr.length) {
    localStorage.setItem('saved_banks', JSON.stringify(bankIdArr));
  } else {
    localStorage.removeItem('saved_banks');
  }
};

export const removeBankName = (bankId) => {
  const savedBankNames = localStorage.getItem('saved_banks')
    ? JSON.parse(localStorage.getItem('saved_banks'))
    : null;

  if (!savedBankNames) {
    return false;
  }

  const updatedSavedBankNames = savedBankNames?.filter((savedBankId) => savedBankId !== bankId);
  localStorage.setItem('saved_banks', JSON.stringify(updatedSavedBankNames));

  return true;
};