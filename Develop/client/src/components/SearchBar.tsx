// import React, { useState } from 'react';

// interface SearchBarProps {
//   onSearch: (query: string) => void;
//   disabled: boolean;
// }

// const SearchBar: React.FC<SearchBarProps> = ({ onSearch, disabled }) => {
//   const [query, setQuery] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setQuery(e.target.value);
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSearch(query);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={query}
//         onChange={handleChange}
//         disabled={disabled} // Disable input until GAPI is ready
//       />
//       <button type="submit" disabled={disabled}>
//         Search
//       </button>
//     </form>
//   );
// };

// export default SearchBar;
