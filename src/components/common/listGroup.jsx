import React from "react";
import PropType from "prop-types";

const ListGroup = ({ selectedItem, items, textProperty, valueProperty, onItemSelect }) => {
  return (
    <ul className="list-group">
      {items.map(item => {
        return (
          <li
            key={item[valueProperty]}
            className={
              "list-group-item list-group-item-action " +
              (selectedItem[textProperty] === item[textProperty] && "active")
            }
            onClick={() => onItemSelect(item)}
            style={{ cursor: "pointer" }}
          >
            {item[textProperty]}
          </li>
        );
      })}
    </ul>
  );
};

ListGroup.propType = {
  currentItem: PropType.string.isRequired,
  items: PropType.object.isRequired,
  textProperty: PropType.string,
  valueProperty: PropType.string,
  onItemSelect: PropType.func.isRequired,
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
