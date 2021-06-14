import React, { memo } from "react";
import * as requests from "./requests";

function Colors() {
  const { data: colors } = requests.colors.read();

  return (
    <ul>
      {colors.map(({ id, color, name }) => (
        <li style={{ background: color }} key={id}>
          {name}
        </li>
      ))}
    </ul>
  );
}

export default memo(Colors);
