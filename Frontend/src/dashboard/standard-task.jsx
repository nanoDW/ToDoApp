import React from '../../../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react';

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