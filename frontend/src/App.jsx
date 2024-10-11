import React from "react";
import Header from "./components/Header";
import Standings from "./components/Standings"
import Matches from "./components/Matches";

export default () => {

  return (
    <>
      <Header />

      <main className="min-vh-100">
        <div className="container">
          <div className="row">
            <Standings />
            <Matches />
          </div>
        </div>
      </main>
    </>
  )
}