import React from 'react'


class Developer extends React.Component {

    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSkillChange = this.handleSkillChange.bind(this);
        this.state = {
            name: '',
            skill: ''
        };
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    handleSkillChange(event) {
        this.setState({skill: event.target.value});
    }

    render() {
            if(!this.props.isEdit) {
                return (
                    <div className="Developer">
                        <button onClick={() => this.props.onDelete(this.props.id)} style={DeleteBtn}>X</button>
                        <h3>Developer name: { this.props.name }</h3>
                        <p>Skill: <strong>{ this.props.skill }</strong></p>
                        <button onClick={()=> {this.props.onEdit()}}>Edit</button>
                    </div>
                )
            } else {
                return (
                    <div className="Developer">
                        <button onClick={() => this.props.onDelete(this.props.id)} style={DeleteBtn}>X</button>
                        <h3>Developer name:
                            <input
                            type="text"
                            placeholder={this.props.name}
                            onChange={this.handleNameChange}
                        /></h3>
                        <p>Skill: <input
                            type="text"
                            placeholder={this.props.skill}
                            onChange={this.handleSkillChange}
                        /></p>
                        <button onClick={()=> {this.props.saveEdit(this.props.id, this.state.name, this.state.skill)}}>Save</button>
                    </div>
                )
            }

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
