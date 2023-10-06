import React from 'react';

export function SideNav() {
  return (
    <div className="Nav">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        {/* Seiteinhalt hier */}

      </div>

      <div className="drawer-side ">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay rounded-lg" ></label>

        
        <ul className="mt-20 rounded-lgmenu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Inhalt der Seitenleiste hier */}
          <li>
            <a>Aktuelle Position </a>
          </li>
          <li>
            <a>Frankfurt</a>
          </li>
          <li>
            <a>Madrid</a>
          </li>
          <li>
            <a>Singapur</a>
          </li>
          <li>
            <a>Dubai</a>
          </li>
        </ul>
      </div>
    </div>
  );
}




