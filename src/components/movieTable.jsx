import React from "react";
import Movie from "./movie";

const MovieTable = props => {
  const { movies, onLike, onDelete, onSort } = props;
  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => onSort("title")}>Title</th>
          <th onClick={() => onSort("genre.name")}>Genre</th>
          <th onClick={() => onSort("numberInStock")}>Stock</th>
          <th onClick={() => onSort("dailyRentalRate")}>Rate</th>
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        {movies.map(m => {
          return <Movie key={m._id} movie={m} onLike={onLike} onDelete={onDelete} />;
        })}
      </tbody>
    </table>
  );
};

export default MovieTable;
