import React from "react";
import Developer from "../Developer/Developer";

class Developers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
        };
        this.deleteTodo = this.deleteTodo.bind(this);
    }

    developer;

    deleteTodo(id) {
        console.log(id)
        fetch('http://localhost:3012/developers/' + id, {
            method: 'DELETE',
        })
            .then(res => res.text()) // or res.json()
            .then(()=>{
                window.location.reload();
            })
    }

    componentDidMount() {

        fetch('http://localhost:3012/developers')
            .then(async response => {
                const data = await response.json();

                if (!response.ok) {
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }

                this.setState({data: data})
                console.log(data)
            })
            .catch(error => {
                this.setState({errorMessage: error.toString()});
                console.error('There was an error!', error);
            });
    }

    render() {
        if( this.state.data) {
            this.developer = this.state.data.map((dev , index) => {
                return (
                    <Developer
                        key={index}
                        id={dev._id}
                        name={dev.name}
                        onDelete={ this.deleteTodo }
                        skill={dev.skill}
                    />
                );
            })
        }

        return (
            <div className="Card">
                <h1>Developers :</h1>
                <div>
                    { this.developer }
                </div>
            </div>
        )
    }
}

export default Developers;
