import React, {Component} from 'react';
import './login.scss'
import {Input, Button} from 'antd';
import {get_data, get_data_get} from '@common';
import {currentUser,setCurrentUser,hostUrl} from '../../../utils/utils'
import {axiosGetJson, axiosPostJson} from '../../common/axiosUtils'
import '../../config/config'
import userStore from "../../mobx";

export default class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginId: '',
            name: '',
            role: 0,
            password: '',
            studentId: ''
        }
    }

    setUserName = (event) => {
        this.setState({
            loginId: event.target.value,
            password: this.state.password
        })
        console.log(this.state)
    }
    setPassword = (event) => {
        this.setState({
            loginId: this.state.loginId,
            password: event.target.value
        })
        console.log(this.state)
    }
    doLogin = () => {
        axiosPostJson.post(hostUrl+'/user/login',
            {loginId: this.state.loginId, password: this.state.password}).then((res) => {
            console.log(userStore.userName)
            userStore.changeUser(this.state.loginId)
            console.log(userStore.userName)
        }).then(()=>{
            userStore.changeloginState()
        }).then(()=>{
            window.location.href='/'
        })
        // get_data('/user/login',{loginId:this.state.loginId,password:this.state.password},this.successFun)
        console.log('doLogin')
    }
    getUser = () => {
        axiosGetJson.get(hostUrl+'/user/getSessionUser?')
            .then((res)=>{
                console.log(userStore.userRole)
                userStore.changeUserRole(res.data.data.role)
                console.log(userStore.userRole)
            });

    }


    render() {
        return (
            <div className="loginDiv">
                <div className="example-input">
                    账号：<Input onChange={this.setUserName} placeholder="请输入账号" size="small"/><br/>
                    密码：<Input onChange={this.setPassword} placeholder="请输入密码" size="small" type="password"/><br/>
                    <Button onClick={this.doLogin} type="primary">登录</Button>
                    <Button onClick={this.getUser} type="primary">查询</Button>
                </div>
            </div>
        );
    }
}