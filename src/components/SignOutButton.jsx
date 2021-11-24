import React from "react";
import { useMsal } from "@azure/msal-react";
import {
LogoutIcon
} from "@heroicons/react/outline";

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
    <button className="w-full text-gray-600 hover:bg-gray-50 hover:text-gray-900 group rounded-md py-2 px-2 flex items-center text-sm font-medium" variant="secondary" onClick={() => handleLogout("redirect")}>
      <LogoutIcon className="h-6 w-6 mr-3"/>
      Log out
    </button>
  );
};
