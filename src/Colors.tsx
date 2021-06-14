import React, { memo } from "react";
import * as requests from "./requests";

function Colors() {
  const { data: colors, error, status } = requests.colors.read();

  return (
    <section>
      {status === "FAILURE" && (
        <p style={{ color: "brown" }}>{error?.message}</p>
      )}

      {status === "SUCCESS" && (
        <ul>
          {colors.map(({ id, color, name }) => (
            <li style={{ background: color }} key={id}>
              {name}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default memo(Colors);
