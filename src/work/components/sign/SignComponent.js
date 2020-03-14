import React, {Component} from 'react';
import '../login/login.scss'
import {Input, Button} from 'antd';
import { Cascader,Alert,Modal  } from 'antd';
import {axiosPostJson} from '../../common/axiosUtils';
import {hostUrl} from '../../../utils/utils'

const options = [
    {
        value: '1',
        label: '教师',
    },
    {
        value: '2',
        label: '学生',
    }
];
export default class SignComponent extends Component {



    constructor(props) {
        super(props);
        this.state = {
            loginId: '',
            name: '',
            role: 0,
            password: '',
            password2: '',
            studentId: ''
        }
    }
    setUserName=(event)=>{
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.loginId=event.target.value
        console.log(this.state)
    }
    setPassword=(event)=>{
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.password=event.target.value
        console.log(this.state)
    }
    setPassword2=(event)=>{
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.password2=event.target.value
        console.log(this.state)
    }
    setName=(event)=>{
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.name=event.target.value
        console.log(this.state)
    }
    setRole=(value) => {
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.role=value[0];
        console.log(this.state)
    }
    setStudentId=(event)=>{
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.studentId=event.target.value;
        console.log(this.state)
    }
    info=(title,msg,onOk=()=>{})=>{
        Modal.info({
            title: title,
            content: (
                <div>
                    <p>{msg}</p>
                </div>
            ),
            onOk
        })
    }
    doSign=()=>{
        console.log('doSign')
        //密码验证
        if(this.state.password != this.state.password2){
            this.info('密码不一致','两次输入的密码不一致，请确认后重试',()=>{});
            return
        }
    //    非空验证
        if (this.state.loginId==''){
            this.info('账号不可为空','请输入登录账号',()=>{});
            return;
        }
        if (this.state.name==''){
            this.info('姓名不可为空','请输入姓名',()=>{});
            return;
        }
        if (this.state.studentId==''&&this.state.role===2){
            this.info('学号不可为空','请输入学号',()=>{});
            return;
        }
        this.signPost();
    }
    signPost=()=>{
        axiosPostJson.post(hostUrl+'/user/sign',this.state).then((res)=>{
            console.log(res)
        })
    }
    render() {
        return (
            <div className="loginDiv">
                <ul className="example-input">
                    账号：<Input onChange={this.setUserName} placeholder="请输入账号" size="small"/><br/>
                    姓名:<Input onChange={this.setName} placeholder="请输入账号" size="small"/><br/>
                    密码:<Input onChange={this.setPassword} placeholder="请输入账号" size="small" type="password"/><br/>
                    确认密码:<Input onChange={this.setPassword2} placeholder="请输入账号" size="small" type="password"/><br/>
                    角色:<Cascader onChange={this.setRole} options={options}  placeholder="选择角色" /><br/>
                    学号:<Input onChange={this.setStudentId} placeholder="请输入账号" size="small"/><br/>
                    <Button onClick={this.doSign} type="primary">注册</Button>

                </ul>
            </div>
        );
    }
}