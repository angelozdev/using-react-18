import React, { useEffect, useState, Suspense } from "react";
import Posts from "./Posts";
import Colors from "./Colors";

function App() {
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    console.log("render");
  });

  const handleClick = () => {
    setCount((prev) => prev + 1);
    setIsActive((prev) => !prev);
  };

  return (
    <div className="App">
      <button
        style={{ background: isActive ? "green" : "brown", color: "white" }}
        onClick={handleClick}
      >
        Click <span>{count}</span>
      </button>

      <Suspense fallback={<p>Loading posts...</p>}>
        <Posts />
      </Suspense>

      <Suspense fallback={<p>Loading colors...</p>}>
        <Colors />
      </Suspense>
    </div>
  );
}

export default App;
