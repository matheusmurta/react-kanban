import React from "react";
import axios from 'axios';
import {
	BrowserRouter as Router,
	Link
  } from "react-router-dom";


export class Board extends React.Component {

	constructor(props) {
		super(props);
		this.state = ({
			boards: [],
			selectedOption: '',
			boardName: '',
			selectedOptionText:''
		});
		this.handleBoardNameChange = this.handleBoardNameChange.bind(this);

	}

	addBoard(event, column) {
		//e.preventDefault();
		const board = {
			name: this.state.boardName,
		}

		axios.post('http://127.0.0.1:3000/api/boards/', board)
			.then(res => console.log(res.data));
		alert('salvo com sucesso');
		window.location.reload();
	}

	handleBoardNameChange(event) {
		this.setState({ boardName: event.target.value });
	}

	componentDidMount() {
		this.get();
	}

	get() {
		axios.get('http://127.0.0.1:3000/api/boards')
			.then(res => {
				this.setState({ boards: res.data, isLoading: false });
			})
			.catch(error => {
				console.log(error);
			});
	}

	handleChange = ({ target }) => {
        this.setState({
			selectedOption: target.value,
			selectedOptionText : target.selectedOptions[0].text
        });
    }


	render() {


		const container = {
			'display': 'flex',
			'justify-content':'center',
			'align-items':'center',
			'height': '100%',
			'background-color': '#e4f1fe',
			'padding': '30px'
		}

		const box = {
			'background-color': 'white',
			'width': '300px',
			'height': '400px',
			'boxShadow': '0px 2px 4px rgba(0, 0, 0, 0.08), 0px 1px 8px rgba(0, 0, 0, 0.08)',
			'margin': '10px',
			'text-align': 'center',
		}

		return (
			<div style={container}>
				<div style={box} >
				<h2>Board Selection</h2>

					<h3>Create a new board </h3>
					<input value={this.state.boardName} onChange={this.handleBoardNameChange} type="text"  placeholder="Board Name"></input>
					<br/>
					<br/>
					<button onClick={(e) => { this.addBoard(e, this.props.stage) }}>Add</button>
					<br/>
					<h3>List of your Boards</h3>
					<br/>
					
						{
						  (
							<div>
								<select
								value={this.state.selectedOption}
								onChange={this.handleChange}
								>
								{this.state.boards.map(({ id, name }, index) => <option key={id} value={id} >{name}</option>)}
								</select>
							</div>
						)
						}
						<br/>
					 <Link to={'/kanban/'+this.state.selectedOption}>Go to {this.state.selectedOptionText} Kanban! </Link>

				</div>
			</div>
			
		);
	}
}

  export default Board;