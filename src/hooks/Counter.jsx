import React, { useState } from "react";

function Counter(props) {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  return (
    <div>
      <input type="text" onChange={e => setName(e.currentTarget.value)} />
      <div>
        {name}: {count}
      </div>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}

export default Counter;
