import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';

import './css/Login.css';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [isformError, setIsFormError] = useState(false);
  const { login, signInWithGoogle } = useAuth();
  const history = useHistory();

  const handleSubmitLogin = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      await login(email, password);
      setLoading(false);
      history.push('/');
    } catch (error) {
      setIsFormError(true);
      setFormError(error.message);
      setLoading(false);
    }
  };

  const handleSubmitGoogle = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      await signInWithGoogle();
      setLoading(false);
      history.push('/');
    } catch (error) {
      setIsFormError(true);
      setFormError(error.message);
      setLoading(false);
    }
  };

  return (
    <Container>
      <div data-testid="login-container"  id="login-container">
        <Grid container align="center" justify="center" direction="column">
          <Container component="main" maxWidth="xs">
            <div>
              <Typography component="h1" variant="h5" data-testid="Sign in typography">
                Sign In
              </Typography>
              {isformError ? (
                <Alert
                  severity="error"
                  onClose={() => {
                    setIsFormError(false);
                  }}
                >
                  {formError}
                </Alert>
              ) : null}
              <form>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  inputProps={{ "data-testid": "Email Address" }}
                  aria-label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(event) => setEmail(event.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  inputProps={{ "data-testid": "Password" }}
                  aria-label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <Button
                  id="sign-in"
                  data-testid="sign-in"
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  onClick={(e) => handleSubmitLogin(e)}
                >
                  Sign In
                </Button>
                <Button
                  id="sign-in-google"
                  data-testid="sign-in-google"
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  disabled={loading}
                  onClick={(e) => handleSubmitGoogle(e)}
                >
                  Sign In With Google
                </Button>
                <Typography>
                  Need an account? <Link to="/signup">Sign Up</Link>
                </Typography>
              </form>
            </div>
          </Container>
        </Grid>
      </div>
    </Container>
  );
}
