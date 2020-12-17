import React from 'react'


class Developer extends React.Component {

    render() {
        return (
            <div className="Developer">
                <button onClick={() => this.props.onDelete(this.props.id)} style={DeleteBtn}>X</button>
                <h3>Developer name: { this.props.name }</h3>
                <p>Skill: <strong>{ this.props.skill }</strong></p>
            </div>
        )
    }
}

let DeleteBtn =
{
    float: 'right',
    color: 'white',
    background: 'red',
    outline: 'none',
    cursor: 'pointer'
}


export default Developer
