import React, { Component } from "react";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import { getMovies } from "../services/fakeMovieService";
import MovieTable from "./movieTable";

class MoviesMenu extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    itemsPerPage: 4,
    selectedGenre: "",
  };

  componentDidMount() {
    const genres = [{ name: "All Genres", _id: 0 }, ...getGenres()];
    const selectedGenre = genres[0];
    this.setState({ movies: getMovies(), genres, selectedGenre });
  }

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

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  render() {
    // Movies
    const { length: count } = this.state.movies;
    // Pagination
    const { itemsPerPage, currentPage, movies: allMovies } = this.state;
    // Filters
    const { selectedGenre, genres } = this.state;

    // No Movies
    if (count === 0) return <p className="text-center">There are no movies in the database.</p>;
    const filtered =
      selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
    const movies = paginate(filtered, currentPage, itemsPerPage);

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <p className="text-center">
              Showing {movies.length} of {filtered.length} movies in the database.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            <ListGroup selectedItem={selectedGenre} items={genres} onItemSelect={this.handleGenreSelect} />
          </div>
          <div className="col">
            <MovieTable movies={movies} onLike={this.handleLikeStatus} onDelete={this.handleDelete} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Pagination
              itemsCount={filtered.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MoviesMenu;
