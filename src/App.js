import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import MicroFrontend from './components/MicroFrontend';

const Home = ({ history }) => (
  <MicroFrontend
    history={history}
    name="Home"
    host={process.env.REACT_APP_HOME_URL}
  />
);

const Account = ({ history }) => (
  <MicroFrontend
    history={history}
    name="Account"
    host={process.env.REACT_APP_ACCOUNT_URL}
  />
);

const Dashboard = ({ history }) => (
  <MicroFrontend
    history={history}
    name="Dashboard"
    host={process.env.REACT_APP_DASHBOARD_URL}
  />
);

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <Link to="/">Home</Link>
            <Link to="/account">Account</Link>
            <Link to="/dashboard">Dashboard</Link>
          </nav>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dashboard" render={Dashboard} />
            <Route exact path="/account/:id?" component={Account} />
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
