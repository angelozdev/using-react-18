import React, { useEffect, useState, Suspense, lazy } from "react";
const Users = lazy(() => import("./Posts"));
const Colors = lazy(() => import("./Colors"));

function App() {
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    console.log("render");
  });

  const handleClick = () => {
    Promise.resolve().then(() => {
      setCount((prev) => prev + 1);
      setIsActive((prev) => !prev);
    });
  };

  return (
    <div className="App">
      <button
        style={{ background: isActive ? "green" : "brown", color: "white" }}
        onClick={handleClick}
      >
        Click <span>{count}</span>
      </button>

      <Suspense fallback={<p>Loading users...</p>}>
        <Users />
      </Suspense>

      <Suspense fallback={<p>Loading colors...</p>}>
        <Colors />
      </Suspense>
    </div>
  );
}

export default App;
