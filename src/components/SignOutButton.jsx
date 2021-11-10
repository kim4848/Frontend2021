import React from "react";
import { useMsal } from "@azure/msal-react";

/**
 * Renders a sign-out button
 */
export const SignOutButton = () => {
  const { instance } = useMsal();

  const handleLogout = (logoutType) => {
    if (logoutType === "popup") {
      instance.logoutPopup({
        postLogoutRedirectUri: "/",
        mainWindowRedirectUri: "/",
      });
    } else if (logoutType === "redirect") {
      instance.logoutRedirect({
        postLogoutRedirectUri: "/",
      });
    }
  };
  return (
    <button className="inline-flex items-center px-2 py-1 border border-transparent shadow-sm text-base font-sm rounded-md text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" variant="secondary" onClick={() => handleLogout("redirect")}>
      Log out
    </button>
  );
};
