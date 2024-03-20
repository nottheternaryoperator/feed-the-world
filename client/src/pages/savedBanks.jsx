import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_BANK } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeBankName } from '../utils/localStorage';

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

  const bankRemoveHandler = async (name) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      removeBankName(name);
      const { data } = await removeBank({ variables: { name } });
      if (error) {
        throw new Error('something went wrong!');
      }
    } catch (error) {
      console.error(error);
    }
  };
  if (loading) {
    return <h2>LOADING...</h2>;
  }
  return (
    <div className="saved-bank-container">
      <>
        {Auth.loggedIn() ? (
          <Container>
            <Grid>
              {userData.savedBanks.map((bank) => {
                return (
                  <div className="fave-results">
                    <Card key={bank.name}>
                      <CardContent>
                        <Typography>Name: {bank.name}</Typography>
                        <br />
                        <Typography>Address: {bank.address}</Typography>
                        <br />
                        <Typography>
                          Urgent Requirements:{' '}
                          <ul>
                            <li>{bank.needs}</li>
                          </ul>
                        </Typography>
                        <Button
                          size="small"
                          onClick={() => bankRemoveHandler(bank.name)}
                        >
                          Remove favourite
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}{' '}
            </Grid>
          </Container>
        ) : (
          <div>NOT LOGGED IN</div>
        )}
      </>
    </div>
  );
}; //end
export default SavedBanks;
