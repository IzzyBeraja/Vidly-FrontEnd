import React, { Component } from "react";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";
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
    return (
      <table className="table">
        <TableHeader columns={this.columns} sortColumn={sortColumn} onSort={onSort} />
        <TableBody data={movies} columns={this.columns} />
      </table>
    );
  }
}

export default MoviesTable;
