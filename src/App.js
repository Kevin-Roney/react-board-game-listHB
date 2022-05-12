import { useState, useEffect } from 'react';
import { getUser } from './services/fetch-utils';
import {
  BrowserRouter as Router,
  Switch,
  NavLink,
  Route,
  Redirect,
} from 'react-router-dom';
import AuthPage from './AuthPage';
import UpdatePage from './UpdatePage';
import ListPage from './ListPage';
import CreatePage from './CreatePage';

import './App.css';
import { logout } from './services/fetch-utils';

export default function App() {
  // You'll need to track the user in state
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  // add a useEffect to get the user and inject the user object into state on load
  useEffect(() => {
    async function loadUser() {
      const user = await getUser();
      if (user) {
        setToken(user.access_token);
        setEmail(user.user.email);
      }
    }
    loadUser();
  }, []);
  async function handleLogout() {
    // call the logout function
    await logout();
    // clear the user in state
    setEmail('');
    setToken('');
  }

  return (
    <Router>
      <div className='App'>
        <header>
          {/* if there is a user in state, render out a link to the board games list, the create page, and add a button to let the user logout */}
          {
            token 
              ? <>
                <NavLink
                  to="/board-games"
                  className={isActive => 'nav-link' + (!isActive ? ' unselected' : '')} 
                >Board Games List</NavLink>
                <NavLink
                  to="/create"
                  className={isActive => 'nav-link' + (!isActive ? ' unselected' : '')} 
                >Create</NavLink>
                <button onClick={handleLogout}>Logout?</button>
              </>
              : <p></p>
          }
        </header>
        <main>
          <Switch>
            <Route exact path="/">
              {/* if there is a user, redirect to the board games list. Otherwise, render the auth page. Note that the AuthPage will need a function called setUser that can set the user state in App.js */}
              {
                token 
                  ? <Redirect to='/board-games' />
                  : <AuthPage getUser={getUser} setEmail={setEmail} setToken={setToken} />
              }
            </Route>
            <Route exact path="/board-games">
              {/* if there is a user, render the board games list. Otherwise, redirect to the home route/auth page */}
              {
                token 
                  ? <ListPage />
                  : <Redirect to='/' />
              }
            </Route>
            <Route exact path='/create'>
              {
                token
                  ? <CreatePage />
                  : <Redirect to='/'/>
              }
            </Route>
            <Route exact path='/board-games/:id'>
              {
                token
                  ? <UpdatePage />
                  : <Redirect to='/'/>
              }
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}