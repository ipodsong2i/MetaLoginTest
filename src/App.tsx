import React from 'react';
import './App.css';
import Facebooklogin from './utils/facebook-login'

function App() {
  
  return (
    <Facebooklogin 
      appId='715792613021236'
      cookie = {false}
      xfbml = {false}
      version='v6.0'
    />
  );
}

export default App;
