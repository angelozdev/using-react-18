import axios, { AxiosError } from "axios";
import { Color, User } from "./types";

interface Data<T> {
  status: "LOADING" | "SUCCESS" | "FAILURE";
  data: T | [];
  error: AxiosError | null;
}

function wrapPromise<T>(promise: Promise<T>) {
  let data: Data<T> = {
    status: "LOADING",
    data: [],
    error: null,
  };

  const suspender = promise
    .then((response) => {
      data = {
        ...data,
        status: "SUCCESS",
        data: response,
      };
    })
    .catch((error) => {
      data = {
        ...data,
        status: "FAILURE",
        error,
      };
    });

  return {
    read() {
      console.log({ ...data });
      if (data.status === "LOADING") {
        throw suspender;
      } else {
        return data;
      }
    },
  };
}

// async function fetchUsers(): Promise<User[]> {
//   console.log("Fetching users...");
//   return axios({
//     method: "GET",
//     baseURL: "https://reqres.in/api",
//     url: "users",
//   }).then(({ data: { data } }) => {
//     return data;
//   });
// }

// async function fetchColors(): Promise<Color[]> {
//   console.log("Fetching colors...");

//   const { data } = await axios({
//     method: "GET",
//     baseURL: "https://reqres.in/api",
//     url: "unknown",
//   });
//   const colors = data.data;
//   return colors;
// }

function fetchUsers(): Promise<User[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          avatar: "avatar",
          email: "user@email.com",
          first_name: "name",
          last_name: "Last",
          id: 1,
        },
      ]);
    }, 2000);
  });
}

function fetchColors(): Promise<Color[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          color: "#eee",
          id: 1,
          name: "Gray",
          pantone_value: "asdasdasdsdfa",
          year: 2000,
        },
      ]);
    }, 3000);
  });
}

export const users = wrapPromise(fetchUsers());
export const colors = wrapPromise(fetchColors());
