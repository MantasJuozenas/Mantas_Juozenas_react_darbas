import { useContext } from 'react';
import { Route } from 'react-router';

import { Link } from 'react-router-dom';
import { AuthContext } from '../assets/store/AuthContext';

function ProtectedRoute(props) {
  const { isUserLoggedIn } = useContext(AuthContext);
  const { children, ...rest } = props;

  return (
    <Route {...rest}>
      {isUserLoggedIn ? (
        children
      ) : (
        <div className='container'>
          <h2>Please login</h2>
          <div className='alert alert-danger'>You are not logged in!!!</div>
          <Link to={'/login'}>Login here 🌏</Link>
        </div>
      )}
    </Route>
  );
}

export default ProtectedRoute;
