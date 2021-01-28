import { Container } from '@material-ui/core';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CompanyInput from './components/CompanyInput';
import Setup from './components/Setup';
import Edit from './components/Edit';
import Results from './components/Results';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Container>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute path="/signup/company" component={CompanyInput} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/setup" component={Setup} />
            <PrivateRoute path="/edit" component={Edit} />
            <PrivateRoute path="/results" component={Results} />
          </Switch>
        </AuthProvider>
      </Router>
    </Container>
  );
}

export default App;
