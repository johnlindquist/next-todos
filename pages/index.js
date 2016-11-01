import React from 'react'
import axios from 'axios'

const API = `https://now-todos-wxzbpfyrvk.now.sh/todos`

export default class TodoApp extends React.Component {
    static async getInitialProps ({ req }) {
        return await axios.get(API)
            .then(res => ({items:res.data}))
    }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = { items: props.items, text: '' };
    }

    render() {
        return (
            <div>
                <h3>TODO</h3>
                <TodoList handleDelete={this.handleDelete} items={this.state.items} />
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} value={this.state.text} />
                    <button>{'Add #' + (this.state.items.length + 1)}</button>
                </form>
            </div>
        );
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        var newItem = {
            title: this.state.text,
            id: Date.now()
        };
        this.setState((prevState) => ({
            items: prevState.items.concat(newItem),
            text: ''
        }));

        axios.post(API, newItem)
    }

    handleDelete(id){        
        this.setState(prevState => ({
            items:prevState.items.filter(item => item.id != id),
        }))        
        axios.delete(`${API}/${id}`)
    }
}

class TodoList extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <ul>
                {this.props.items.map(item => (                    
                    <li key={item.id}>{item.title}
                        <button onClick={this.props.handleDelete.bind(this, item.id)}><img src="https://icon.now.sh/delete_forever"/></button>
                    </li>                    
                ))}
            </ul>
        );
    }
}
