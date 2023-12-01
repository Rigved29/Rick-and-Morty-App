import React from 'react';
import RoutesComp from './RoutesComp';
import './App.css';
import { DataProvider } from './contexts/appContext';

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
