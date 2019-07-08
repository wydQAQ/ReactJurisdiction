import React, { Component } from "react";
import "../style/loginStyle.css";
import { Input, Button, Icon, message } from "antd";
import imgLogin from "../asstes/login.jpg";
import Axios from "axios";
class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lockDate: false,
      username: "",
      password: ""
    };
  }

  //双向绑定登录数据
  loginData = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  //发送登录请求
  loginPost = () => {
    Axios.post("/api/userlogin", {
      username: this.state.username,
      password: this.state.password
    }).then(res => {
      if (res.data.code == 0) {
        message.error("请检查用户名或密码");
      } else {
        message.success("登录成功");
        sessionStorage.setItem(
          "APP_LOGIN_USER",
          JSON.stringify({ name: this.state.username, pwd: this.state.password })
        );
        let lastlocation = JSON.parse(sessionStorage.getItem("APP_LAST_URL"));
        if (lastlocation) {
            this.props.history.push(lastlocation);
            sessionStorage.removeItem("APP_LAST_URL");
        } else {
          this.props.history.push("/app");
        }
      }
    });

  };

  render() {
    return (
      <div className="bgBox">
        <div className="imgBox">
          <img src={imgLogin} alt="" />
        </div>
        <Input
          name="username"
          onChange={this.loginData}
          value={this.state.username}
          placeholder="请输入您的用户名"
          prefix={<Icon type="user" />}
        />
        <Input.Password
          name="password"
          value={this.state.password}
          onChange={this.loginData}
          prefix={<Icon type="lock" />}
          placeholder="请输入密码"
        />
        <Button type="primary" onClick={this.loginPost}>
          Login
        </Button>
      </div>
    );
  }
}

export default login;
