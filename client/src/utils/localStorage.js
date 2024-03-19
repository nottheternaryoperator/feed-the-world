export const getSavedBankNames = () => {
  const savedBankNames = localStorage.getItem('saved_banks')
    ? JSON.parse(localStorage.getItem('saved_banks'))
    : [];

  return savedBankNames;
};

export const saveBankNames = (bankNameArr) => {
  if (bankNameArr.length) {
    localStorage.setItem('saved_banks', JSON.stringify(bankNameArr));
  } else {
    localStorage.removeItem('saved_banks');
  }
};

export const removeBankName = (bankName) => {
  const savedBankNames = localStorage.getItem('saved_banks')
    ? JSON.parse(localStorage.getItem('saved_banks'))
    : null;

  if (!savedBankNames) {
    return false;
  }

  const updatedSavedBankNames = savedBankNames?.filter(
    (savedBankNames) => savedBankNames !== bankName
  );
  localStorage.setItem('saved_banks', JSON.stringify(updatedSavedBankNames));

  return true;
};
