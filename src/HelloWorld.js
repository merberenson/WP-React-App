import React, { Component } from 'react';

class HelloWorld extends Component {
    render() {
        return (
            <div>
                <h1>Hello World!</h1>
                <p>Hello, {this.props.name}!</p>
            </div>
        );
    }
}

export default HelloWorld;