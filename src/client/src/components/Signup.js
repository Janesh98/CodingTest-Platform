import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import './css/Signup.css';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { callRegister } from '../endpoints';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [isformError, setIsFormError] = useState(false);
  const { signup, signInWithGoogle } = useAuth();
  const history = useHistory();

  const validatePassword = (confirmPass) => {
    setConfirmPassword(confirmPass);

    if (password !== confirmPass) {
      setIsError(true);
      return setError('Passwords do not match');
    }
    setIsError(false);
    setError('');
  };

  const postUserDetails = async (user) => {
    await callRegister({
      googleId: user.uid,
      email: user.email,
    });
  };

  const handleSubmitSignup = async (e) => {
    try {
      e.preventDefault();

      if (isError !== false) return;
      setLoading(true);
      const res = await signup(email, password);
      postUserDetails(res.user);

      setLoading(false);
      history.push('/signup/company');
    } catch (error) {
      setIsFormError(true);
      setFormError(error.message);
      setLoading(false);
    }
  };

  const handleSubmitGoogle = async (e) => {
    try {
      e.preventDefault();

      if (isError !== false) return;
      setLoading(true);
      const res = await signInWithGoogle();

      postUserDetails(res.user);

      setLoading(false);
      history.push('/signup/company');
    } catch (error) {
      setIsFormError(true);
      setFormError(error.message);
      setLoading(false);
    }
  };

  return (
    <Container>
      <div id="signup">
        <Grid container align="center" justify="center" direction="column">
          <Container component="main" maxWidth="xs">
            <div>
              <Typography component="h1" variant="h5">
                Sign Up
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
                  label="Email Address"
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
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Confirm Password"
                  type="password"
                  id="confirm-password"
                  error={isError}
                  helperText={error}
                  autoComplete="current-password"
                  onChange={(event) => validatePassword(event.target.value)}
                />
                <Button
                  id="sign-up"
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  onClick={(e) => handleSubmitSignup(e)}
                >
                  Sign Up
                </Button>
                <Button
                  id="sign-up-google"
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  disabled={loading}
                  onClick={(e) => handleSubmitGoogle(e)}
                >
                  Sign Up With Google
                </Button>
                <Typography>
                  Already have an account? <Link to="/login">Sign In</Link>
                </Typography>
              </form>
            </div>
          </Container>
        </Grid>
      </div>
    </Container>
  );
}
