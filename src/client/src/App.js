import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CompanyInput from './components/CompanyInput';
import Setup from './components/Setup';
import Questions from './components/Questions';
import Edit from './components/Edit';
import EditTest from './components/EditTest';
import EditChallenge from './components/EditChallenge';
import NewChallenge from './components/NewChallenge';
import EditQuestions from './components/EditQuestions';
import Results from './components/Results';
import ParticipantsList from './components/ParticipantsList';
import ParticipantsResults from './components/ParticipantsResults';
import Create from './components/Create';
import AddParticipants from './components/AddParticipants';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import CodingTest from './components/CodingTest/CodingTest';
import VideoRecord from './components/CodingTest/VideoInterview/VideoRecord';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute path="/signup/company" component={CompanyInput} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute path="/create" component={Create} />
          <PrivateRoute path="/setup" component={Setup} />
          <PrivateRoute path="/questions" component={Questions} />
          <PrivateRoute path="/edit" component={Edit} />
          <PrivateRoute path="/edittest" component={EditTest} />
          <PrivateRoute path="/editchallenge" component={EditChallenge} />
          <PrivateRoute path="/newchallenge" component={NewChallenge} />
          <PrivateRoute path="/editquestions" component={EditQuestions} />
          <PrivateRoute path="/results" component={Results} />
          <PrivateRoute path="/participantsresults" component={ParticipantsList} />
          <PrivateRoute path="/IndividualResults" component={ParticipantsResults} />
          <PrivateRoute path="/addparticipants" component={AddParticipants} />
          <Route
            path="/codingtest/:codingTestId/:participantId"
            component={CodingTest}
          />
          <Route path="/videointerview/:codingTestId/:participantId" component={VideoRecord} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
