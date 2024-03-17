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
}; //end

export default SavedBanks;
