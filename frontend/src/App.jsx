import React from "react";
import Header from "./components/Header";
import Table from "./components/Table";

export default () => {

  return (
    <>
      <Header />

      <main className="min-vh-100">
        <Table />
      </main>
    </>
  )
}