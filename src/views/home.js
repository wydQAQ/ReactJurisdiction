import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import { Route, Switch, Link } from "react-router-dom";
import UserList from "../components/UserList";

const { Header, Content, Footer, Sider } = Layout;

class home extends Component {
  render() {
    let { match } = this.props;
    return (
      <div>
        <Layout>
          <Sider
            style={{
              height: "100vh",
              position: "fixed",
              left: 0
            }}
          >
            <Menu
              style={{ paddingTop: "200px" }}
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
            >
              <Menu.Item style={{ marginTop: "30px" }} key="1">
                <Icon type="user" />
                <span className="nav-text">
                  <Link style={{ color: "#fff" }} to={`${match.path}/userlist`}>
                    用户列表{" "}
                  </Link>
                </span>
              </Menu.Item>
              <Menu.Item style={{ marginTop: "30px" }} key="2">
                <Icon type="video-camera" />
                <span className="nav-text">角色管理</span>
              </Menu.Item>
              <Menu.Item style={{ marginTop: "30px" }} key="3">
                <Icon type="upload" />
                <span className="nav-text">权限管理</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ marginLeft: 200 }}>
            <Header style={{ background: "#fff", padding: 0 }}>
              <h3 style={{ textAlign: "center" }}>React权限模拟</h3>
            </Header>
            <Content
              style={{
                height: "750px",
                margin: "24px 16px 0",
                overflow: "initial"
              }}
            >
              <div
                style={{
                  height: "750px",
                  padding: 24,
                  background: "#4f5555",
                  textAlign: "center",
                  borderRadius: "5px"
                }}
              >
                <Switch>
                  <Route path={`${match.path}/userlist`} component={UserList} />
                </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              版权所有 ©2019 Aicoder from beijing
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default home;
