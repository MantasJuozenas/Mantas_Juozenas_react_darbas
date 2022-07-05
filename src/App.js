import { Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Wrapper from './components/Wrapper/Wrapper';
import HomePage from './page/Home/HomePage';
import LoginPage from './page/Login/LoginPage';
import RegisterPage from './page/Register/RegisterPage';

function App() {
  return (
    <Wrapper>
      <div className='App'>
        <Header />
        <Switch>
          <Route path='/login'>
            <LoginPage />
          </Route>
          <Route path='/register'>
            <RegisterPage />
          </Route>
          <ProtectedRoute path={'/'}>
            <HomePage />
          </ProtectedRoute>
          <Route path='*'>
            <h2>Page not found</h2>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Wrapper>
  );
}

export default App;
