import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  /**Add the following state to the component useing the useState hook: 
  is logged in: false
  userUsername: ''**/
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userUsername, setUserUsername] = useState('');

  /**Use the useEffect hook to do the following whenever the component mounts:  
   * Get the value of accessToken item from the localStorage
   * Send a post request to /api/auth/ with the authorization header set to Beare<accessToken
  onSuccess set the isLogged in and the userUsername state to true and the username from the response object respectively
  */
 useEffect(() => {
  const checkLogInStatus = async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      try {
        const response = await fetch('/api/auth/', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer $(accessToken)`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(true);
          setUserUsername(data.username);
        } else {
          // module error or invalid token
          setIsLoggedIn(false);
          setUserUsername('');
        }
      } catch (error) {
        console.error('error checking authentication:', error);
        setIsLoggedIn(false);
        setUserUsername('');
      }
    }
  };
  checkLogInStatus();
}, []);

return (
  <div className="App">
    {isLoggedIn ? ( 
      <p>Dashboard will be here (username: {userUsername})</p>
    ) : (
      <p>Authentication component will go here </p>
    )}
  </div>
  );
}
