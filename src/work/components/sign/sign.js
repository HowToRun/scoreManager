import React, {Component} from 'react';
import Header from '../header/Header';
import Body from '../body/Body';

export default class Sign extends Component {

    render() {
        return (
            <div>
                <Header/>
                <Body body="sign"/>
            </div>
        );
    }
}