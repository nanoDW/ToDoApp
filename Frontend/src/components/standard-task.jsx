import React from 'react';

export default class StandardTask extends React.Component {
state = {
    description: "",
    priority: "",
    done: ""
};

render() {
    return (
        <>
            <p>{this.state.description}</p>
            <button></button>
            <button></button>
            <button></button>
        </> 
    )
}
}