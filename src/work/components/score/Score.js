import React, {Component} from 'react';
import {hostUrl} from '../../../utils/utils';
import {axiosGetJson} from '../../common/axiosUtils';
import {Cascader, Descriptions} from 'antd';

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
export default class Score extends Component {

    constructor(props){
        super(props);
        this.state = {
            elements:this.props.elements,
            totalScore:this.props.totalScore,
            studentId:this.props.studentId,
            averageScore:this.props.averageScore,
            semester:''
        }
    }

    componentDidMount() {
        axiosGetJson.get(hostUrl+'/student/getCurriculumScore?id='+this.state.studentId+'&semester='+this.state.semester)
            .then((res)=>{
                this.setState({
                    data:res.data.data
                })
                console.log(this.state.data)
            }).then(this.showStudentScore).then(()=>{
            axiosGetJson.get(hostUrl+'/student/getTotalScore?id='+this.state.studentId+'&semester='+this.state.semester)
                .then((res)=>{
                    this.setState({totalScore:res.data.data})
                })
        }).then(()=>{
            axiosGetJson.get(hostUrl+'/student/getAverageScore?id='+this.state.studentId+'&semester='+this.state.semester)
                .then((res)=>{
                    this.setState({
                        averageScore:res.data.data
                    })
                })
        })
    }

    render() {
        return (
            <div>
                <div className="sme">
                    学期:<Cascader onChange={this.props.searchSemester} options={options}  placeholder="选择学期" />
                </div><br/>
                <Descriptions bordered title="" >
                    {this.state.elements}
                    <Descriptions.Item label="总分">{this.state.totalScore}</Descriptions.Item>
                    <Descriptions.Item label="平均分">{this.state.averageScore}</Descriptions.Item>
                </Descriptions>
            </div>
        );
    }
}