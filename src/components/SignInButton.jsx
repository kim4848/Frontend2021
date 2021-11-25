import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";

/**
 * Renders a drop down button with child buttons for logging in with a popup or redirect
 */
export const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = (loginType) => {
    if (loginType === "popup") {
      instance.loginPopup(loginRequest).catch((e) => {
        console.log(e);
      });
    } else if (loginType === "redirect") {
      instance.loginRedirect(loginRequest).catch((e) => {
        console.log(e);
      });
    }
  };
  return (
    <button className="inline-flex items-center px-2 py-1 border border-transparent shadow-sm text-base font-sm rounded-md text-white bg-indigo-500 pr-8 pl-8 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" variant="secondary" onClick={() => handleLogin("redirect")}>
      Login
    </button>
  );
};
