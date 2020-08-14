import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = path => {
    if (path) {
      const { sortColumn, onSort } = this.props;
      const order = sortColumn.path === path && sortColumn.order === "asc" ? "desc" : "asc";
      onSort({ path: path || sortColumn.path, order });
    }
  };

  renderSortIcon = column => {
    const { sortColumn } = this.props;

    if (column.path !== sortColumn.path) return null;
    return sortColumn.order === "asc" ? <i className="fas fa-sort-up" /> : <i className="fas fa-sort-down" />;
  };

  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map(column => (
            <th className={column.path && "clickable"} key={column.key} onClick={() => this.raiseSort(column.path)}>
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
