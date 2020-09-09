import React, { Component } from "react";
import Table from "./common/table";
import LikeButton from "./common/like";
import { Link } from "react-router-dom";
import auth from "../services/authService";

class MoviesTable extends Component {
  columns = [
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
          onClick={() => this.props.onLike(movie)}
        ></LikeButton>
      ),
    },
  ];

  deleteColumn = {
    key: "delete",
    content: movie => (
      <button
        className="btn btn-danger btn-sm"
        onClick={() => this.props.onDelete(movie)}
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.role === "Admin") this.columns.push(this.deleteColumn);
  }

  render() {
    const { movies, sortColumn, onSort } = this.props;
    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={movies}
      />
    );
  }
}

export default MoviesTable;
