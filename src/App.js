import React from "react";

import Dropdown from "./Dropdown/Dropdown.js";

import "./App.scss";

const items = [
  { id: 1, text: "First Item" },
  { id: 2, text: "Second Item" },
  { id: 3, text: "Third Item" },
];

function App() {
  return (
    <div style={{ margin: "0 auto", width: "200px" }}>
      <Dropdown onSelect={() => {}} items={items} />
    </div>
  );
}

export default App;
