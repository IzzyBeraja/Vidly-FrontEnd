import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      className="form-control my-2"
      onChange={e => onChange(e.currentTarget.value)}
      value={value}
      placeholder="Search..."
    />
  );
};

export default SearchBox;
