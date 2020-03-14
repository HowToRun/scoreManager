import React, {Component} from 'react';
import Header from '../header/Header';
import {Descriptions, Button, Modal, Input, Badge, Cascader} from 'antd';
import {axiosGetJson, axiosPostJson} from '../../common/axiosUtils';
import {hostUrl} from '../../../utils/utils';
import './SearchScore.scss'
import {Tree, Icon} from 'antd';

const {TreeNode} = Tree;

const options = [
    {
        value: '1.1',
        label: '大一上学期'
    },
    {
        value: '1.2',
        label: '大一下学期'
    },
    {
        value: '2.1',
        label: '大二上学期'
    },
    {
        value: '2.2',
        label: '大二下学期'
    },
    {
        value: '3.1',
        label: '大三上学期'
    },
    {
        value: '3.2',
        label: '大三下学期'
    },
    {
        value: '4.1',
        label: '大四上学期'
    },
    {
        value: '4.2',
        label: '大四下学期'
    }
];
const classOptions = [];
const elements = [];
const studentList = [];
export default class SearchScoreComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            studentId: 0,
            userId: 0,
            totalScore: '',
            semester: '',
            role: 0,
            averageScore: 0,
            data: [{
                curriculumName: '',
                score: 0
            }],
            studentList: [{}],
            ModalText: 'Content of the modal',
            updateVisible: false,
            insertVisible: false,
            delVisible: false,
            confirmLoading: false,
            updateInfo: {
                studentId: 0,
                score: 0,
                curriculumId: '',
                semester: ''
            }
        }
    }

    componentDidMount() {
        axiosGetJson.get(hostUrl + '/teacher/getAllClass').then((res) => {
            res.data.data.map((item, key) => {
                classOptions.push({
                    value: item.id,
                    label: item.curriculumName
                })
            })
            console.log(classOptions)
        })
        this.getData()
    }

    getStudentData = (res) => {
        this.setState({
            userId: res.data.data.id,
            role: res.data.data.role
        })
        if (res.data.data.role == 2) {
            axiosGetJson.get(hostUrl + '/student/getCurriculumScore?id=' + res.data.data.id + '&semester=' + this.state.semester)
                .then((res) => {
                    this.setState({
                        data: res.data.data
                    })
                    console.log(this.state.data)
                }).then(this.showStudentScore).then(() => {
                axiosGetJson.get(hostUrl + '/student/getTotalScore?id=' + this.state.userId + '&semester=' + this.state.semester)
                    .then((res) => {
                        this.setState({totalScore: res.data.data})
                    })
            }).then(() => {
                axiosGetJson.get(hostUrl + '/student/getAverageScore?id=' + this.state.userId + '&semester=' + this.state.semester)
                    .then((res) => {
                        this.setState({
                            averageScore: res.data.data
                        })
                    })
            })
        }
    }
    getTeacherData = (res) => {
        this.setState({
            userId: res.data.data.id,
            role: res.data.data.role
        })
        axiosGetJson.get(hostUrl + '/teacher/getStudentInfoByTeacherId?teacher=' + this.state.userId)
            .then((res) => {
                this.setState({
                    studentList: res.data.data
                })
                this.state.studentList.forEach((item) => {
                    studentList.push(
                        <TreeNode key={item.id} title={item.name}/>
                    )
                })
            }).then(this.getStudentScore(this.state.studentId))

        console.log('教师')
    }
    getData = () => {
        axiosGetJson.get(hostUrl + '/user/getSessionUser').then((res) => {
            if (res.data.data.role === 2) {
                this.getStudentData(res);
            } else if (res.data.data.role === 1) {
                this.getTeacherData(res)
            }
        })
    }
    searchSemester = (value) => {
        if (value[0]===undefined){
            value[0]=''
        }
        elements.splice(0, elements.length);
        this.state.data.splice(0, this.state.data.length);
        this.setState({
            semester: value[0]
        })
        this.getData()
        console.log(this.state)
    }
    showStudentScore = () => {
        elements.pop()
        this.state.data.forEach((item, key) => {
            elements.push(<Descriptions.Item key={key} label={item.curriculumName}>{item.score}</Descriptions.Item>)
        })

    }
    onSelect = (event) => {
        console.log(event)
        if (event.length > 0) {
            this.setState({
                studentId: event[0]
            })
            this.getStudentScore(event[0])
            console.log(this.state)
        }
    }
    getStudentScore = (studentId) => {
        axiosGetJson.get(hostUrl + '/student/getCurriculumScore?id=' + studentId + '&semester=' + this.state.semester)
            .then((res) => {
                this.setState({
                    data: res.data.data
                })
                console.log(this.state.data)
            }).then(this.showStudentScore).then(() => {
            axiosGetJson.get(hostUrl + '/student/getTotalScore?id=' + studentId + '&semester=' + this.state.semester)
                .then((res) => {
                    this.setState({totalScore: res.data.data})
                })
        }).then(() => {
            axiosGetJson.get(hostUrl + '/student/getAverageScore?id=' + studentId + '&semester=' + this.state.semester)
                .then((res) => {
                    this.setState({
                        averageScore: res.data.data
                    })
                })
        })
    }
    updateScore = () => {
        console.log(this.state)
    }
    insertScore = () => {
        console.log(this.state)
    }
    setUpdateSemester = (value) => {
        if (value[0]===undefined){
            value[0]=''
        }
        this.setState({
            updateInfo: {
                studentId: this.state.studentId,
                semester: value[0],
                curriculumId: this.state.updateInfo.curriculumId,
                score: this.state.updateInfo.score
            }
        })
        console.log(this.state.updateInfo)
    }
    setUpdateClass = (value) => {
        this.setState({
            updateInfo: {
                studentId: this.state.studentId,
                semester: this.state.updateInfo.semester,
                curriculumId: value[0],
                score: this.state.updateInfo.score
            }
        })
        console.log(this.state.updateInfo)
    }
    setUpdateScore = (event) => {

        this.setState({
            updateInfo: {
                studentId: this.state.studentId,
                semester: this.state.updateInfo.semester,
                curriculumId: this.state.updateInfo.curriculumId,
                score: event.target.value
            }
        })
        console.log(this.state.updateInfo)
    }
    showTable = () => {
        if (this.state.role === 2) {
            return (
                <div>
                    <div className="sme">
                        学期:<Cascader onChange={this.searchSemester} options={options} placeholder="选择学期"/>

                    </div>
                    <br/>
                    <Descriptions bordered title="">
                        {elements}
                        <Descriptions.Item label="总分">{this.state.totalScore}</Descriptions.Item>
                        <Descriptions.Item label="平均分">{this.state.averageScore}</Descriptions.Item>
                    </Descriptions>
                </div>
            )
        } else if (this.state.role === 1) {
            return (
                <div>
                    <Tree className="tree"
                        defaultExpandedKeys={['0-0-0']}
                        onSelect={this.onSelect}
                        showLine
                        switcherIcon={<Icon type="down"/>}
                    >
                        <TreeNode key="0" title="学生">
                            {this.state.studentList.map((item) => {
                                return <TreeNode key={item.id} title={item.name}/>
                            })}
                        </TreeNode>
                    </Tree>
                    <div className="sme">
                        学期:<Cascader onChange={this.searchSemester} options={options} placeholder="选择学期"/>
                        <Button className="button" onClick={this.showUpdateModal} type="primary">
                            修改成绩
                        </Button>
                        <Button className="button" onClick={this.showInsertModal} type="primary">
                            添加成绩
                        </Button>
                        <Button className="button" onClick={this.showDELModal} type="primary">
                            删除成绩
                        </Button>
                    </div>
                    <br/>
                    <Descriptions bordered title="">
                        {this.state.data.map((item, key) => {
                            return <Descriptions.Item key={key}
                                                      label={item.curriculumName}>{item.score}</Descriptions.Item>
                        })}
                        <Descriptions.Item label="总分">{this.state.totalScore}</Descriptions.Item>
                        <Descriptions.Item label="平均分">{this.state.averageScore}</Descriptions.Item>
                    </Descriptions>
                    <Modal
                        confirmLoading={this.state.confirmLoading}
                        onCancel={this.handleCancel}
                        onOk={this.handleOk}
                        title="修改成绩"
                        visible={this.state.updateVisible}
                    >
                        学期:<Cascader onChange={this.setUpdateSemester} options={options} placeholder="选择学期"/>
                        课程:<Cascader onChange={this.setUpdateClass} options={classOptions} placeholder="选择课程"/><br/>
                        分数：<Input onChange={this.setUpdateScore} placeholder="Basic usage"/>
                    </Modal>
                    <Modal
                        confirmLoading={this.state.confirmLoading}
                        onCancel={this.handleCancel}
                        onOk={this.handleInsertOk}
                        title="添加成绩"
                        visible={this.state.insertVisible}
                    >
                        学期:<Cascader onChange={this.setUpdateSemester} options={options} placeholder="选择学期"/>
                        课程:<Cascader onChange={this.setUpdateClass} options={classOptions} placeholder="选择课程"/><br/>
                        分数：<Input onChange={this.setUpdateScore} placeholder="Basic usage"/>
                    </Modal>
                    <Modal
                        confirmLoading={this.state.confirmLoading}
                        onCancel={this.handleCancel}
                        onOk={this.handleDelOk}
                        title="删除成绩"
                        visible={this.state.delVisible}
                    >
                        学期:<Cascader onChange={this.setUpdateSemester} options={options} placeholder="选择学期"/>
                        课程:<Cascader onChange={this.setUpdateClass} options={classOptions} placeholder="选择课程"/><br/>
                    </Modal>
                </div>
            )
        }
    }
    showUpdateModal = () => {
        this.setState({
            updateVisible: true
        });
    };
    showInsertModal = () => {
        this.setState({
            insertVisible: true
        });
    };
    showDELModal = () => {
        this.setState({
            delVisible: true
        });
    };
    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true
        });
        if (this.state.updateInfo.studentId === 0) {
            alert('请选择学生');
            this.setState({
                updateVisible: false,
                confirmLoading: false
            });
            return;
        }
        axiosPostJson.post(hostUrl + '/teacher/updateStudentScore', this.state.updateInfo).then((res) => {
            if (res.data.code==='000000'){
                this.getData()
            }
        })
        setTimeout(() => {
            this.setState({
                updateVisible: false,
                confirmLoading: false
            });
        }, 2000);
    };
    handleInsertOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true
        });
        if (this.state.updateInfo.studentId === 0) {
            alert('请选择学生');
            this.setState({
                insertVisible: false,
                confirmLoading: false
            });
            return;
        }
        axiosPostJson.post(hostUrl + '/teacher/addStudentScore', this.state.updateInfo).then((res) => {
            if (res.data.code==='000000'){
                this.getData()
            }
        })
        setTimeout(() => {
            this.setState({
                insertVisible: false,
                confirmLoading: false
            });
        }, 2000);
    };
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            updateVisible: false,
            delVisible: false,
            insertVisible: false
        });
    };
    handleDelOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true
        });
        if (this.state.updateInfo.studentId === 0) {
            alert('请选择学生');
            this.setState({
                delVisible: false,
                confirmLoading: false
            });
            return;
        }
        axiosPostJson.post(hostUrl + '/teacher/delStudentScore', this.state.updateInfo).then((res) => {
            if (res.data.code==='000000'){
                this.getData()
            }else {
                alert(res.data.msg)
            }
        })
        setTimeout(() => {
            this.setState({
                delVisible: false,
                confirmLoading: false
            });
        }, 2000);
    };
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            updateVisible: false,
            delVisible: false,
            insertVisible: false
        });
    };

    render() {
        return (
            <div>
                {this.showTable()}
            </div>
        );
    }
}