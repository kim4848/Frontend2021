import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";

const baseUrl = "https://dev-eksame2021.azurewebsites.net/api/";

export default function GetToken() {
  const { instance, accounts } = useMsal();

  return instance
    .acquireTokenSilent({
      ...loginRequest,
      account: accounts[0],
    })
    .then((response) => {
      return response.accessToken;
    });
}

//const baseUrl = "http://localhost:7071/api/";
export const GetLicense = async (token) => {
  console.log("the token", token);
  return GetRequest("license", token);
};

export const PutLicense = async (data, token) => {
  return fetch(baseUrl + "license", {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    body: JSON.stringify(data), // body data type must match "Content-Type" header

    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response;
      }
      throw new Error("Unable to fetch data");
    })
    .catch((x) => {
      console.log("Api load error", x);
      return { error: x };
    });
};

export const CreateLicense = async (data, token) => {
  return fetch(baseUrl + "addlicense", {
    method: "post", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    body: JSON.stringify(data), // body data type must match "Content-Type" header

    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error("Unable to fetch data");
    })
    .catch((x) => {
      console.log("Api load error", x);
      return { error: x };
    });
};

const GetRequest = async (url, token) => {
  if (!token) return [];

  return fetch(baseUrl + url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error("Unable to fetch data");
    })
    .then((resData) => {
      return resData;
    })
    .catch((x) => {
      console.log("Api load error", x);
      return { error: x };
    });
};
