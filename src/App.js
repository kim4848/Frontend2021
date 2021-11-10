import React from "react";
import Layout from "./components/layout";
import MainView from "./Views/MainView";

/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */

export default function App() {
  return (
    <Layout>
      <MainView></MainView>
    </Layout>
  );
}
