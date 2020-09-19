import React, { useState, useEffect } from "react";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/genreService";
import { getMovies, deleteMovie } from "../services/movieService";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";

function MoviesMenu(props) {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });

  useEffect(() => {
    async function fetchData() {
      const { data: movieData } = await getMovies();
      const { data: genreData } = await getGenres();
      const genres = [{ name: "All Genres", id: "" }, ...genreData];
      setGenres(genres);
      setMovies(movieData);
      setSelectedGenre(genres[0]);
    }

    fetchData();
  }, []);

  const handleLikeStatus = movie => {
    const newMovies = movies.map(({ ...m }) => {
      if (m.id === movie.id) m.liked = !movie.liked;
      return m;
    });
    setMovies(newMovies);
  };

  const handleDelete = async movie => {
    const originalMovies = movies;
    const newMovies = originalMovies.filter(m => m.id !== movie.id);
    setMovies(newMovies);

    try {
      await deleteMovie(movie.id);
    } catch (error) {
      if (error.response && error.response.status === 404)
        alert("This movie has already been deleted");

      setMovies(originalMovies);
    }
  };

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const handleGenreSelect = genre => {
    setSelectedGenre(genre);
    setCurrentPage(1);
    setSearchQuery("");
  };

  const handleSort = sortColumn => {
    setSortColumn(sortColumn);
  };

  const handleSearch = searchQuery => {
    setSearchQuery(searchQuery);
    setSelectedGenre("");
    setCurrentPage(1);
  };

  const getPageData = () => {
    const allMovies = movies;
    let filtered = allMovies;
    if (selectedGenre && selectedGenre.id)
      filtered = allMovies.filter(m => m.genre.id === selectedGenre.id);
    else if (searchQuery)
      filtered = allMovies.filter(m =>
        m.title.toUpperCase().includes(searchQuery.toUpperCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], sortColumn.order);
    const paginatedMovies = paginate(sorted, currentPage, itemsPerPage);

    return { totalCount: filtered.length, data: paginatedMovies };
  };

  // Movies
  const { length: count } = movies;
  const { user } = props;

  if (count === 0)
    return <p className="text-center">There are no movies in the database.</p>;

  const { totalCount, data } = getPageData();

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
          {user && (
            <Link className="btn btn-primary my-2" to="/movies/new">
              Add New Movie
            </Link>
          )}
          <ListGroup
            selectedItem={selectedGenre}
            items={genres}
            onItemSelect={handleGenreSelect}
          />
        </div>
        <div className="col">
          <SearchBox value={searchQuery} onChange={handleSearch} />
          <MoviesTable
            movies={data}
            sortColumn={sortColumn}
            onLike={handleLikeStatus}
            onDelete={handleDelete}
            onSort={handleSort}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Pagination
            itemsCount={totalCount}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default MoviesMenu;
