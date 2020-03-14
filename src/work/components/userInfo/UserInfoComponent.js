import React, {Component} from 'react';
import { Descriptions, Badge } from 'antd';
import './userInfo.scss'
import {axiosPostJson,axiosGetJson} from '../../common/axiosUtils';
import {hostUrl} from '../../../utils/utils'
export default class UserInfoComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            userInfo:{
                name:'',
                loginId:'',
                role:0,
                studentId:'',
                className:'',
                teacherName:''

            }
        }
    }

    componentDidMount() {
        axiosGetJson.get(hostUrl+'/user/getSessionUser').then((res)=>{
            if (res.data.code==='500'){
                console.log(res.data.message)
                window.location.href='/login'
            }
            if (res.data.data.role===2){
                console.log('学生')
                axiosGetJson.get(hostUrl+'/student/info?id='+res.data.data.id).then((res)=>{
                    console.log(res.data)
                    this.setState({
                        userInfo:res.data.data
                    })
                })
            }
            if (res.data.data.role===1){
                console.log('教师')
                axiosGetJson.get(hostUrl+'/teacher/info?id='+res.data.data.id).then((res)=>{
                    console.log(res.data)
                    this.setState({
                        userInfo:res.data.data
                    })
                })
            }
            if (res.data.data.role===0){
                this.setState({
                    userInfo:res.data.data
                })
            }
        })
    }
    showInfo=()=>{
        if (this.state.userInfo.role===2){
            return (
                <Descriptions bordered layout="vertical" title="User Info"  >
                    <Descriptions.Item label="姓名">{this.state.userInfo.name}</Descriptions.Item>
                    <Descriptions.Item label="账号">{this.state.userInfo.loginId}</Descriptions.Item>
                    <Descriptions.Item label="角色">{this.state.userInfo.role}</Descriptions.Item>
                    <Descriptions.Item label="学号">{this.state.userInfo.studentId}</Descriptions.Item>
                    <Descriptions.Item label="班级">{this.state.userInfo.className}</Descriptions.Item>
                    <Descriptions.Item label="导员">{this.state.userInfo.teacherName}</Descriptions.Item>
                    <Descriptions.Item label="修改密码">update password</Descriptions.Item>
                </Descriptions>
            )
        }else if (this.state.userInfo.role===1){
            return (
                <Descriptions bordered layout="vertical" title="User Info"  >
                    <Descriptions.Item label="姓名">{this.state.userInfo.name}</Descriptions.Item>
                    <Descriptions.Item label="账号">{this.state.userInfo.loginId}</Descriptions.Item>
                    <Descriptions.Item label="角色">{this.state.userInfo.role}</Descriptions.Item>
                    <Descriptions.Item label="班级">{this.state.userInfo.className}</Descriptions.Item>
                    <Descriptions.Item label="修改密码">update password</Descriptions.Item>
                </Descriptions>
            )
        }else if (this.state.userInfo.role===0){
            return (
                <Descriptions bordered layout="vertical" title="User Info"  >
                    <Descriptions.Item label="姓名">{this.state.userInfo.name}</Descriptions.Item>
                    <Descriptions.Item label="账号">{this.state.userInfo.loginId}</Descriptions.Item>
                    <Descriptions.Item label="角色">{this.state.userInfo.role}</Descriptions.Item>
                    <Descriptions.Item label="修改密码">update password</Descriptions.Item>
                </Descriptions>
            )
        }
    }

    render() {
        return (
            this.showInfo()
        );
    }
}