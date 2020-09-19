import React from "react";

function TableHeader(props) {
  const raiseSort = path => {
    if (path) {
      const { sortColumn, onSort } = props;
      const order =
        sortColumn.path === path && sortColumn.order === "asc" ? "desc" : "asc";
      onSort({ path: path || sortColumn.path, order });
    }
  };

  const renderSortIcon = column => {
    const { sortColumn } = props;

    if (column.path !== sortColumn.path) return null;
    return sortColumn.order === "asc" ? (
      <i className="fas fa-sort-up" />
    ) : (
      <i className="fas fa-sort-down" />
    );
  };

  const { columns } = props;
  return (
    <thead>
      <tr>
        {columns.map(column => (
          <th
            className={column.path && "clickable"}
            key={column.key}
            onClick={() => raiseSort(column.path)}
          >
            {column.label} {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
