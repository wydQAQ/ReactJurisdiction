import React, { Component } from "react";
import { Table, Input, Button, message } from "antd";
import Axios from "axios";
import "../style/userList.css";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedData: []
    };
  }

  //获取所有数据
  componentDidMount() {
    this.upDateAllData();
  }

  //实时更新
  upDateAllData = () => {
    Axios.get("/api/user?del=false", {
      headers: {
        Authorization: "beiwei"
      }
    }).then(res => {
      res.data.forEach(item => {
        item["key"] = item.id;
      });
      this.setState({
        data: res.data
      });
    });
  };

  //搜索查询更新
  upDateData = value => {
    Axios.get(`/api/user?name_like=${value}&del=false`, {
      headers: {
        Authorization: "beiwei"
      }
    }).then(res => {
      res.data.forEach(item => {
        item["key"] = item.id;
      });
      this.setState({
        data: res.data
      });
    });
  };

  //删除
  delDate = () => {
    if (this.state.selectedData.length > 0) {
      this.state.selectedData.forEach(item => {
        item.del = true;
        console.log(item);
        Axios.put(`/api/user/${item.id}`, item, {
          headers: {
            Authorization: "beiwei"
          }
        }).then(res => {
          message.success("删除成功");
          this.upDateAllData();
        });
      });
    } else {
      message.error("请选择要移除的用户");
    }
  };

  // 修改
  changeData = () =>{
    
  }
  
  // 添加
  postNewData = () =>{

  }

  render() {
    // 插件事件
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedData: selectedRows
        });
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
      },
      getCheckboxProps: record => ({
        disabled: record.name === "Disabled User",
        name: record.name
      })
    };

    const columns = [
      {
        title: "用户名",
        dataIndex: "name",
        width: 150
      },
      {
        title: "电话",
        dataIndex: "phone",
        width: 150
      },
      {
        title: "大学",
        dataIndex: "school",
        width: 150
      },
      {
        title: "邮箱",
        dataIndex: "mail",
        width: 150
      }
    ];
    const { Search } = Input;
    return (
      <div>
        <div className="menu-top">
          <div className="menu-left">
            <Button type="primary" onClick={this.postNewData}>添加</Button>
            <Button>更改</Button>
            <Button type="danger" onClick={this.delDate}>
              删除
            </Button>
          </div>
          <Search
            placeholder="请输入用户名查询"
            onSearch={value => this.upDateData(value)}
            enterButton
          />
        </div>
        <Table
          style={{ backgroundColor: "#fff" }}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.state.data}
          defaultPageSize={6}
        />
      </div>
    );
  }
}

export default UserList;
