import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Movie from "./movie";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: getMovies(),
    itemsPerPage: 4,
    currentPage: 1,
  };

  handleLikeStatus = movie => {
    const movies = [...this.state.movies].map(({ ...m }) => {
      if (m._id === movie._id) m.liked = !movie.liked;
      return m;
    });
    this.setState({ movies });
  };

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  render() {
    const { length: count } = this.state.movies;
    const { itemsPerPage, currentPage, movies: allMovies } = this.state;
    if (count === 0) return <p className="text-center">There are no movies in the database.</p>;
    const movies = paginate(allMovies, currentPage, itemsPerPage);

    return (
      <React.Fragment>
        <p className="text-center">Showing {count} movies in the database.</p>
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
              return <Movie key={m._id} movie={m} onLike={this.handleLikeStatus} onDelete={this.handleDelete} />;
            })}
          </tbody>
        </table>
        <Pagination
          itemsCount={count}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
