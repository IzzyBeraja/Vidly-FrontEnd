import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = props => {
  const { itemsCount, itemsPerPage, currentPage, onPageChange } = props;
  if (itemsPerPage <= 0 || itemsPerPage > itemsCount) return null;
  const pagesCount = Math.ceil(itemsCount / itemsPerPage);
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination" style={{ justifyContent: "center" }}>
        {pages.map(page => {
          return (
            <li
              key={page}
              className={"page-item" + (page === currentPage && " active")}
              onClick={() => onPageChange(page)}
              style={{ cursor: "pointer" }}
            >
              <p className="page-link">{page}</p>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
