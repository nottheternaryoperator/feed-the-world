import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_BANK } from '../utils/mutations';
import Auth from '../utils/auth';
// import { removeBankName } from '../utils/localStorage';

import TextField from '@mui/material/TextField';
import {
  CardActionArea,
  FormControl,
  FormLabel,
  CardActions,
  CardContent,
  Typography,
  fabClasses,
} from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import './savedBanks.css';

const SavedBanks = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeBank, { error }] = useMutation(REMOVE_BANK);
  const userData = data?.me || {};

  const bankRemoveHandler = async (bankName) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeBank({ variables: { bankName } });
      removeBankName(bankName);
    } catch (error) {
      console.error(error);
    }
  };
  if (loading) {
    return <h2>LOADING...</h2>;
  }
  return (
    <>
      <Container>
        <Grid>
          {userData.savedBanks.map((bank) => {
            return (
              <Card key={bank.bankName}>
                <CardContent>
                  <Typography>{bank.name}</Typography>
                  <Typography>{bank.address}</Typography>
                  <Typography>{bank.needs}</Typography> 
                </CardContent>
              </Card>
            );
          })}{' '}
        </Grid>
      </Container>
    </>
  );
}; //end
export default SavedBanks;
