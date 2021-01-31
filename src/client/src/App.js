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
import CodingTest from './components/CodingTest/CodingTest';

function App() {
  return (
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute path="/signup/company" component={CompanyInput} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute path="/setup" component={Setup} />
            <PrivateRoute path="/edit" component={Edit} />
            <PrivateRoute path="/results" component={Results} />
            <PrivateRoute path="/codingtest" component={CodingTest} />
          </Switch>
        </AuthProvider>
      </Router>
  );
}

export default App;
