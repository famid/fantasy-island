import React, { useState } from 'react';

function FilterInput(props) {
  const [searchText, setSearchText] = useState('');

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
    props.onSearchTextChange(event.target.value);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          value={searchText}
          onChange={handleSearchTextChange}
          placeholder="Search"
          className="block w-full px-4 py-2 pl-8 leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-2">
          <svg
            className="w-4 h-4 text-gray-500 fill-current"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.5 0C2.47 0 0 2.47 0 5.5C0 8.53 2.47 11 5.5 11C6.78 11 8.01 10.58 9.07 9.86L11.29 12.09C11.7 12.5 12.33 12.5 12.74 12.09C13.15 11.68 13.15 11.05 12.74 10.64L10.52 8.42C11.24 7.36 11.67 6.13 11.67 4.81C11.67 1.78 9.22 0 5.5 0ZM5.5 2C7.43 2 9 3.57 9 5.5C9 7.43 7.43 9 5.5 9C3.57 9 2 7.43 2 5.5C2 3.57 3.57 2 5.5 2Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default FilterInput;