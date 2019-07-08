import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Login from "./views/login";
import "antd/dist/antd.css";
import Home from "./views/home";

class App extends Component {
  checkUserState = e => {
    // 判断用户是否已经登录
    if (sessionStorage.getItem("APP_LOGIN_USER")) {
      return true;
    }
    return false;
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/app" />} />
          <Route path="/login" component={Login} />
          <Route
            path="/app"
            render={props => {
              if (this.checkUserState()) {
              return <Home {...props} />;
              }
              sessionStorage.setItem(
                "APP_LAST_URL",
                JSON.stringify(props.location)
              );
              return <Redirect to="/login" />;
            }}
          />
        </Switch>
      </Router>
    );
  }
}
export default App;
