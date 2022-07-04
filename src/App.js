import { Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './page/Home/HomePage';
import LoginPage from './page/Login/LoginPage';
import RegisterPage from './page/Register/RegisterPage';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/'>
          <HomePage />
        </Route>
        <Route path='/login'>
          <LoginPage />
        </Route>
        <Route path='/register'>
          <RegisterPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
