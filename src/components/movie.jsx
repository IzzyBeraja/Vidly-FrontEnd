import React from "react";
import LikeButton from "./common/like";

const Movie = props => {
  const { movie, onLike, onDelete } = props;
  return (
    <tr key={movie._id}>
      <td>{movie.title}</td>
      <td>{movie.genre.name}</td>
      <td>{movie.numberInStock}</td>
      <td>{movie.dailyRentalRate}</td>
      <td>
        <LikeButton liked={movie.liked} onClick={() => onLike(movie)}></LikeButton>
      </td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={() => onDelete(movie)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Movie;
