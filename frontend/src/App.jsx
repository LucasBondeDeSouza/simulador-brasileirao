import React from "react";
import Header from "./components/Header";
import Standings from "./components/Standings"

export default () => {

  return (
    <>
      <Header />

      <main className="min-vh-100">
        <Standings />
      </main>
    </>
  )
}