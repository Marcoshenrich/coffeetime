
import React from "react";
import { Route, Switch } from "react-router-dom";
import SplashPage from "./components/SplashPage";

function App() {
  return (
    <>
      <Switch>
        <Route path="/">
          <SplashPage/>
        </Route>
      </Switch>
    </>
  );
}

export default App;