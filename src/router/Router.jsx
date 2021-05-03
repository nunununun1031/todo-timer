import React from "react";
import { Route, Switch } from "react-router";
import Todo from "../components/todo/Todo";
import Page404 from "../components/Page404";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Todo />
      </Route>
      <Route path="*">
        <Page404 />
      </Route>
    </Switch>
  );
};

export default Router;
