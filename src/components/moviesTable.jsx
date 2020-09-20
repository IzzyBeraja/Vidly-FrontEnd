import React, { useState, useEffect } from "react";
import Table from "./common/table";
import LikeButton from "./common/like";
import { Link } from "react-router-dom";
import auth from "../services/authService";

function MoviesTable({ onDelete, onLike, onSort, movies, sortColumn }) {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const user = auth.getCurrentUser();
    const columns = [
      {
        key: "title",
        path: "title",
        label: "Title",
        content: movie => <Link to={`/movies/${movie.id}`}>{movie.title}</Link>,
      },
      { key: "genre.name", path: "genre.name", label: "Genre" },
      { key: "numberInStock", path: "numberInStock", label: "Stock" },
      { key: "dailyRentalRate", path: "dailyRentalRate", label: "Rate" },
      {
        key: "like",
        content: movie => (
          <LikeButton
            liked={movie.liked}
            onClick={() => onLike(movie)}
          ></LikeButton>
        ),
      },
    ];
    const deleteColumn = {
      key: "delete",
      content: movie => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(movie)}
        >
          Delete
        </button>
      ),
    };
    if (user && user.role === "Admin") columns.push(deleteColumn);
    setColumns(columns);
  }, [onLike, onDelete]);

  return (
    <Table
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
      data={movies}
    />
  );
}

export default MoviesTable;
