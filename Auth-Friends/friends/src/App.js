import {Route} from 'react-router-dom';
import Login from './components/Login';
import Friends from './components/Friends';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <>
      <Route exact path="/">
        <Login />
      </Route>
      <ProtectedRoute path="/friends" component={Friends} />
    </>
  );
}

export default App;