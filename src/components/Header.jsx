import React from 'react';

const Header = () => {
  return (
    <div>
      <nav className="flex h-20 w-full items-center justify-center bg-blue-500 px-11">
        <ul className="flex w-full items-center justify-between">
          <li>
            <a href="">Home</a>
          </li>
          <li>
            <a href="">Menu</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
