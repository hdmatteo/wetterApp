import React, {useState} from 'react';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import i18n from './i18n';
import { Location } from './App';

type Props = {
  setLocation: (newLocation: Location) => void
}

export function SideNav({setLocation}: Props) {
  
  const [selectedLanguage, setSelectedLanguage] = useState('de');


  const handleChangeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  }

  function handleLocationClick(location:Location){
    setLocation(location);
  }

  return (
    <div className="Nav">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        {/* Seiteinhalt hier */}

      </div>

      <div className="drawer-side " style={{ zIndex: 1000 }}>
        <label htmlFor="my-drawer" aria-label="close sidebar" className=" drawer-overlay rounded-lg" ></label>
        <ul className="mt-20 rounded-lg menu p-6 w-80 min-h-full bg-base-200  text-gray font-sans font-bold">
          <li>
            <a onClick={() => handleLocationClick("currentlocation")}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 11.25l1.5 1.5.75-.75V8.758l2.276-.61a3 3 0 10-3.675-3.675l-.61 2.277H12l-.75.75 1.5 1.5M15 11.25l-8.47 8.47c-.34.34-.8.53-1.28.53s-.94.19-1.28.53l-.97.97-.75-.75.97-.97c.34-.34.53-.8.53-1.28s.19-.94.53-1.28L12.75 9M15 11.25L12.75 9" />
            </svg>
              Aktuelle Position</a>
          </li>
          <li>
            <a onClick={() =>handleLocationClick("Frankfurt")}>Frankfurt</a>
          </li>
          <li>
            <a onClick={() =>handleLocationClick("Madrid")}>Madrid</a>
          </li>
          <li>
            <a onClick={() =>handleLocationClick("Singapur")}>Singapur</a>
          </li>
          <li>
            <a onClick={() =>handleLocationClick("Dubai")}>Dubai</a>
          </li>
          <div className="dropdown dropdown-hover ">
            <label tabIndex={0} className="btn text-gray font-sans font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
            </svg>Settings
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu  shadow bg-base-100 rounded-box w-52 p-6 flex flex-row">
     

            <select
              className="select select-info max-w-xs"
              onChange={handleChangeLanguage} // Call the language change handler
              value={selectedLanguage} // Set the selected value
                
              >
            
                <option value="de">Deutsch</option>
                <option value="en">English</option>
            </select>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 ">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
            </svg>
            </ul>
          </div>
          
        </ul> 
      </div>
      
    </div>
  );
}




