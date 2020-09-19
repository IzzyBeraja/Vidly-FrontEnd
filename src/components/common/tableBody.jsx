import React from "react";
import _ from "lodash";

function TableBody(props) {
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  const { data, columns } = props;

  return (
    <tbody>
      {data.map(item => (
        <tr key={item.id}>
          {columns.map(column => (
            <td key={column.key}>{renderCell(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
