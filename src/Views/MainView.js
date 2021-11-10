import React, { useState } from "react";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import License from "./../components/License";
import LicenseView from "./LicensesView";
import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "./../components/SignInButton";
import { SignOutButton } from "./../components/SignOutButton";

export default function MainView() {
  const [license, setLicense] = useState(null);
  const isAuthenticated = useIsAuthenticated();

  return (
    <div className="App">
      {isAuthenticated ? <SignOutButton /> : <SignInButton />}
      <AuthenticatedTemplate>
        {license ? (
          <License license={license} onBackBlick={() => setLicense(null)} />
        ) : (
          <LicenseView onLicenseSlected={(e) => setLicense(e)}></LicenseView>
        )}
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate></UnauthenticatedTemplate>
    </div>
  );
}
