import React from 'react';
import RoutesComp from './RoutesComp';
import './App.css';
import { DataProvider } from './contexts/appContext';

//Wrapping RoutesComp (component containing all routes) with context provider so that all the context values and function will be availbe to all the components

function App() {
  return (
    <div className="App">
      <DataProvider>
        <RoutesComp />
      </DataProvider>
    </div>
  );
}

export default App;
