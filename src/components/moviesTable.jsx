import React, { Component } from "react";
import Movie from "./movie";
import TableHeader from "./common/tableHeader";

class MoviesTable extends Component {
  columns = [
    { key: "title", path: "title", label: "Title" },
    { key: "genre.name", path: "genre.name", label: "Genre" },
    { key: "numberInStock", path: "numberInStock", label: "Stock" },
    { key: "dailyRentalRate", path: "dailyRentalRate", label: "Rate" },
    { key: "like", label: "Like" },
    { key: "delete" },
  ];

  render() {
    const { movies, sortColumn, onLike, onDelete, onSort } = this.props;
    return (
      <table className="table">
        <TableHeader columns={this.columns} sortColumn={sortColumn} onSort={onSort} />
        <tbody>
          {movies.map(m => {
            return <Movie key={m._id} movie={m} onLike={onLike} onDelete={onDelete} />;
          })}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;
