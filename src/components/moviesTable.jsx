import React, { Component } from "react";
import Table from "./common/table";
import LikeButton from "./common/like";

class MoviesTable extends Component {
  columns = [
    { key: "title", path: "title", label: "Title" },
    { key: "genre.name", path: "genre.name", label: "Genre" },
    { key: "numberInStock", path: "numberInStock", label: "Stock" },
    { key: "dailyRentalRate", path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => <LikeButton liked={movie.liked} onClick={() => this.props.onLike(movie)}></LikeButton>,
    },
    {
      key: "delete",
      content: movie => (
        <button className="btn btn-danger btn-sm" onClick={() => this.props.onDelete(movie)}>
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movies, sortColumn, onSort } = this.props;
    return <Table columns={this.columns} sortColumn={sortColumn} onSort={onSort} data={movies} />;
  }
}

export default MoviesTable;
