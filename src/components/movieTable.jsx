import React from "react";
import Movie from "./movie";

const MovieTable = props => {
  const { movies, onLike, onDelete } = props;
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Genre</th>
          <th>Stock</th>
          <th>Rate</th>
          <th></th>
          <th></th>
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
