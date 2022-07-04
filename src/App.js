import { useContext } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import { AuthContext } from './components/store/AuthContext';
import HomePage from './page/Home/HomePage';
import LoginPage from './page/Login/LoginPage';
import RegisterPage from './page/Register/RegisterPage';

function App() {
  const { isUserLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route path='/login'>
          {!isUserLoggedIn && history.push('/login')}
          <LoginPage />
        </Route>
        <Route path='/register'>
          <RegisterPage />
        </Route>
        <Route exact path='/'>
          {isUserLoggedIn && <HomePage />}
        </Route>
        <Route path='*'>
          <h2>Page not found</h2>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
