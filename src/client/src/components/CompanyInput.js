import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Button,
  TextField,
  Grid,
  Container,
  Typography,
} from '@material-ui/core';
import { callCompany, updateCompany } from '../endpoints';

const CompanyInput = () => {
  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState('');
  const [error, setError] = useState('');
  const [isError, setISError] = useState(false);
  const history = useHistory();
  const { currentUser } = useAuth();

  useEffect(() => {
    const getCompanies = async () => {
      const res = await callCompany();
      setCompanies(res.data.map((item) => item.company.toLowerCase()));
    };

    getCompanies();
  }, []);

  const setCompanyAndRemoveErrors = (company) => {
    setCompany(company);
    if (isError) {
      setISError(false);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (companies.includes(company.toLowerCase())) {
      setISError(true);
      return setError('Company already exists');
    } else {
      await updateCompany({
        googleId: currentUser.uid,
        company,
      });
      return history.push('/');
    }
  };

  return (
    <div>
      <Grid container align="center" justify="center" direction="row">
        <Container component="main" maxWidth="xs">
          <div>
            <Typography component="h1" variant="h5">
              Enter Company
            </Typography>
            <form>
              <TextField
                variant="filled"
                color="primary"
                margin="normal"
                fullWidth
                required
                name="company"
                label="company"
                type="company"
                id="company"
                error={isError}
                helperText={error}
                autoComplete="company"
                onChange={(input) =>
                  setCompanyAndRemoveErrors(input.target.value)
                }
              />
              <Button
                id="submit-company"
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </Button>
            </form>
          </div>
        </Container>
      </Grid>
    </div>
  );
};

export default CompanyInput;