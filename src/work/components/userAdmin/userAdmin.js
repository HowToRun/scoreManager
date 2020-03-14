import React, {Component} from 'react';
import Header from '../header/Header';
import Body from '../body/Body';

export default class UserAdmin extends Component {

    render() {
        return (
            <div>
                <Header/>
                <Body body="UserAdmin"/>
            </div>
        );
    }
}