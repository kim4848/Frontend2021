import React, { useState } from "react";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import License from "./../components/License";
import LicenseView from "./LicensesView";
import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "./../components/SignInButton";

export default function MainView() {
  const [license, setLicense] = useState(null);
  const isAuthenticated = useIsAuthenticated();

  return (
    <div className="App">
      {isAuthenticated ? null : (
        <div className="grid place-items-center">
          <div className="h-48 w-48 p-5 flex flex-col content-center rounded shadow-md border items-center ">
            <h1 className="mt-5 font-semibold text-lg text-indigo-600 ">
              Account
            </h1>
            <h1 className="font-medium text-gray-500">Log in is required</h1>
            <div className="content-center mt-5">
              <SignInButton />
            </div>
          </div>
        </div>
      )}
      <AuthenticatedTemplate>
        {license ? (
          <License license={license} onBackClick={() => setLicense(null)} />
        ) : (
          <LicenseView onLicenseSlected={(e) => setLicense(e)}></LicenseView>
        )}
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate></UnauthenticatedTemplate>
    </div>
  );
}
