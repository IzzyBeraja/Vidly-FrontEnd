import React from "react";
import withTooltip from "../hoc/withTooltip";

const Rentals = props => {
  return (
    <div>
      <h1>Rentals</h1>
      <h3>{props.showTooltip && <div>Tooltip</div>}</h3>
    </div>
  );
};

export default withTooltip(Rentals);
