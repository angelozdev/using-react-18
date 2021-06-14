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

async function fetchUsers(): Promise<User[]> {
  console.log("Fetching users...");

  const { data } = await axios({
    method: "GET",
    baseURL: "https://reqres.in/api",
    url: "users",
  });

  const users = data.data;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(users);
    }, 2000);
  });
}

async function fetchColors(): Promise<Color[]> {
  console.log("Fetching colors...");

  const { data } = await axios({
    method: "GET",
    baseURL: "https://reqres.in/api",
    url: "unknown",
  });
  const colors = data.data;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(colors);
    }, 3000);
  });
}

export const users = wrapPromise(fetchUsers());
export const colors = wrapPromise(fetchColors());
