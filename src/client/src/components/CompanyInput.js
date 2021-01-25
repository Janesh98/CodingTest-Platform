import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {
  Button,
  TextField,
  Grid,
  Container,
  Typography,
} from '@material-ui/core';

const CompanyInput = () => {
  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState('');
  const [error, setError] = useState('');
  const [isError, setISError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const getCompanies = async () => {
      const res = await axios.get(
        'http://localhost:5000/coding-test-platform/us-central1/api/company'
      );

      setCompanies(
        res.data.companies.map((item) => item.company.toLowerCase())
      );
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
      await axios.post(
        'http://localhost:5000/coding-test-platform/us-central1/api/company',
        {
          company,
        }
      );
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
