import React, {Component} from 'react';
import { Button,Modal } from 'antd';
import {axiosPostJson} from '../../common/axiosUtils';
import {hostUrl} from '../../../utils/utils';


export default class UserAdminComponent extends Component {
    state={
        userList:[],
        visible: false,
        userId:0,
        type:1
    }


    componentDidMount() {
        axiosPostJson.get(hostUrl+'/user/getAllUser').then((res)=>{
            this.setState({
                userList:res.data.data
            })
            console.log(this.state.userList)
        })
    }
    getData=()=>{
        axiosPostJson.get(hostUrl+'/user/getAllUser').then((res)=>{
            this.setState({
                userList:res.data.data
            })
            console.log(this.state.userList)
        })
    }
    delUser=(id)=>{
        axiosPostJson.post(hostUrl+'/user/del?userId='+id).then((res)=>{
            if (res.data.code==='000000'){
                alert(res.data.message)
                this.getData()
            }
        })
    }
    reInitPassword=(id)=>{
        axiosPostJson.post(hostUrl+'/user/reInit?userId='+id).then((res)=>{
            if (res.data.code==='000000'){
                alert(res.data.message)
                this.getData()
            }
        })
    }
    showModal = (id,type) => {
        this.setState({
            userId:id,
            visible: true,
            type:type
        });
        console.log(this.state.userId)
    };

    handleOk = () => {
        console.log(this.state.type);
        if (this.state.type===0){
            this.delUser(this.state.userId)
        }else if (this.state.type===1){
            this.reInitPassword(this.state.userId)
        }
        this.setState({
            visible: false
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false
        });
    };


    render() {
        return (
            <div className="ant-descriptions ant-descriptions-bordered">
                <div className="ant-descriptions-title">User Info</div>
                <div className="ant-descriptions-view">
                    <table>
                        <tbody>
                        <tr className="ant-descriptions-row">
                            <th className="ant-descriptions-item-label ant-descriptions-item-colon" colSpan="1">姓名</th>
                            <th className="ant-descriptions-item-label ant-descriptions-item-colon" colSpan="1">账号</th>
                            <th className="ant-descriptions-item-label ant-descriptions-item-colon" colSpan="1">角色</th>
                            <th className="ant-descriptions-item-label ant-descriptions-item-colon" colSpan="1">学号</th>
                            <th className="ant-descriptions-item-label ant-descriptions-item-colon" colSpan="1">注册时间</th>
                            <th className="ant-descriptions-item-label ant-descriptions-item-colon" colSpan="1">操作</th>
                        </tr>
                        {
                            this.state.userList.map((item,key)=>{
                                return (
                                    <tr className="ant-descriptions-row" key={key}>
                                        <td className="ant-descriptions-item-content" colSpan="1">{item.name}</td>
                                        <td className="ant-descriptions-item-content" colSpan="1">{item.loginId}</td>
                                        <td className="ant-descriptions-item-content" colSpan="1">{item.role}</td>
                                        <td className="ant-descriptions-item-content" colSpan="1">{item.studentId}</td>
                                        <td className="ant-descriptions-item-content" colSpan="1">{item.createTime}</td>
                                        <td className="ant-descriptions-item-content" colSpan="1">
                                            <Button onClick={this.showModal.bind(this,item.id,0)} className="button" type="danger">删除</Button>
                                            <Button onClick={this.showModal.bind(this,item.id,1)} className="button" type="danger">重置密码</Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                    <Modal
                        onCancel={this.handleCancel}
                        onOk={this.handleOk.bind(this,this.state.type)}
                        title="确认"
                        visible={this.state.visible}
                    >
                        <p>确认操作？</p>
                    </Modal>
                </div>
            </div>
        );
    }
}