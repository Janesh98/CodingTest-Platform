import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { auth } from '../firebase';
import firebase from 'firebase/app';
import './Signup.css';

const googleSignIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const user = auth.signInWithPopup(provider);
  console.log(user);
};

const signIn = () => {
  console.log('sign in with email and password');
};

export default function SignIn() {
  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
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
          />
          <Button
            id="sign-in"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => signIn()}
          >
            Sign In
          </Button>
          <Button
            id="sign-in-google"
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            onClick={() => googleSignIn()}
          >
            Sign In With Google
          </Button>
        </form>
      </div>
    </Container>
  );
}
