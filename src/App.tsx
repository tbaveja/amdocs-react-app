import React from "react";
import { createStore } from "redux";
import Header from "./components/Header/Header";
import DataTable from "./components/DataTable/DataTable";
import { Provider } from "react-redux";
import reducer from "./reducer/reducer";
import "./scss/App.scss";

function App () {
  const store = createStore(reducer);
  return (
    <Provider store={store}>
      <div className="app">
        <Header />
        <DataTable />
      </div>
    </Provider>
  );
}

export default App;
