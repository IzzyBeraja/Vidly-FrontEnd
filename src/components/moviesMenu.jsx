import React, { Component } from "react";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import { getMovies } from "../services/fakeMovieService";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";

class MoviesMenu extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    itemsPerPage: 4,
    selectedGenre: "",
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ name: "All Genres", _id: "" }, ...getGenres()];
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

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      // Pagination
      itemsPerPage,
      currentPage,
      movies: allMovies,
      // Filters
      selectedGenre,
      // Sorting
      sortColumn,
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;
    const sorted = _.orderBy(filtered, [sortColumn.path], sortColumn.order);
    const movies = paginate(sorted, currentPage, itemsPerPage);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    // Movies
    const { length: count } = this.state.movies;
    const {
      // Pagination
      itemsPerPage,
      currentPage,
      // Filters
      selectedGenre,
      genres,
      // Sorting
      sortColumn,
    } = this.state;

    if (count === 0)
      return (
        <p className="text-center">There are no movies in the database.</p>
      );

    const { totalCount, data } = this.getPageData();

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <p className="text-center">
              Showing {data.length} of {totalCount} movies in the database.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            <Link className="btn btn-primary my-2" to="/movies/new">
              Add New Movie
            </Link>
            <ListGroup
              selectedItem={selectedGenre}
              items={genres}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <MoviesTable
              movies={data}
              sortColumn={sortColumn}
              onLike={this.handleLikeStatus}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Pagination
              itemsCount={totalCount}
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
