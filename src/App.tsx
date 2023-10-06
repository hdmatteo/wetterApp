import React, { useState } from 'react';
import './App.css';
import './Sidenav';
import Weathercurrentlocation from './Weathercurrentlocation';
import Weatherbycity from './Weatherbycity';
import { SideNav } from './Sidenav';

export type Location = "currentlocation"|City
export type City = "Frankfurt"|"Madrid" |"Singapur"| "Dubai"

function App() {

  const [location,setLocation] = useState<Location>("currentlocation");
  
  
  return (
      <>
      <SideNav setLocation={setLocation}/> 
     {location === "currentlocation" ? <Weathercurrentlocation/> : <Weatherbycity city={location}/> }
      
      </>
  );
}




export default App;


