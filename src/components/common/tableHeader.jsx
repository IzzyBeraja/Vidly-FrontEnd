import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = path => {
    if (path) {
      const { sortColumn, onSort } = this.props;
      const order = sortColumn.path === path && sortColumn.order === "asc" ? "desc" : "asc";
      onSort({ path: path || sortColumn.path, order });
    }
  };

  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column.key} onClick={() => this.raiseSort(column.path)}>
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
