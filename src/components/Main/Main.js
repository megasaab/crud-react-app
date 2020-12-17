import React from "react";
import './Main.css'


class Main extends React.Component {

    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSkillChange = this.handleSkillChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            name: '',
            skill: ''
        };
    }

    handleSubmit(event) {
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.state.name,
                skill: this.state.skill
            })
        };
        fetch('http://localhost:3012/developers', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    handleSkillChange(event) {
        this.setState({skill: event.target.value});
    }

    render() {
        return (
            <div>
                <div className="box">
                    <form onSubmit={this.handleSubmit}>
                        <span className="text-center">Create person</span>
                        <div className="input-container">
                            <input
                                type="text"
                                placeholder="name"
                                value={this.state.name}
                                onChange={this.handleNameChange}
                            />
                            <label>Full Name</label>
                        </div>
                        <div className="input-container">
                            <input
                                type="text"
                                placeholder="skill"
                                value={this.state.skill}
                                onChange={this.handleSkillChange}
                            />
                            <label>Skill</label>
                        </div>
                        <button>Create</button>
                    </form>
                </div>
            </div>
        );
    }
}


export default Main
