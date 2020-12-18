import React from "react";
import Developer from "../Developer/Developer";

class Developers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isEdit: false
        };
        this.deleteCard = this.deleteCard.bind(this);
        this.editCard = this.editCard.bind(this);
        this.saveEdit = this.saveEdit.bind(this);
    }

    developer;

    deleteCard(id) {
        console.log(id)
        fetch('http://localhost:3012/developers/' + id, {
            method: 'DELETE',
        })
            .then(res => res.text()) // or res.json()
            .then(()=>{
                window.location.reload();
            })
    }

    editCard() {
        this.setState({isEdit: true})
    }

    saveEdit(id, name, skill) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, skill: skill })
        };
        fetch('http://localhost:3012/developers/' + id , requestOptions)
            .then(() => {
                this.setState({isEdit: false})
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
                        onDelete={ this.deleteCard }
                        onEdit={ this.editCard }
                        isEdit = { this.state.isEdit}
                        saveEdit ={ this.saveEdit }
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
