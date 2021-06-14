import React, { memo, useEffect } from "react";
import * as requests from "./requests";

function Posts() {
  const { data: users, error, status } = requests.users.read();
  useEffect(() => {
    console.log("render", "posts");
  });

  return (
    <section>
      {status === "FAILURE" && (
        <p>{error?.message || "Server internal error"}</p>
      )}

      {status === "SUCCESS" && (
        <ul>
          {users.map((post) => (
            <li key={post.id}>
              {post.first_name} {post.last_name}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default memo(Posts);
