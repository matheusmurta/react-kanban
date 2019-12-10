import React from "react";
import KanbanBoard from './kanban-board';
import axios from 'axios';

export class Kanban extends React.Component {

	constructor(props) {
		super(props);

		let  url = window.location.pathname;
		let  id = url.substring(url.lastIndexOf('/') + 1);

		this.state = ({
			boardID : id,
			board: []
		});
		
	}

	

	get() {
		console.log(this.state.boardID);

		axios.get('http://127.0.0.1:3001/api/boards/'+ this.state.boardID )
			.then(res => {
				this.setState({ board: res.data[0].name, isLoading: false });
			})
			.catch(error => {
				console.log(error);
			});
	}

	componentDidMount() {
		this.get();
	}

	
	render() {

		const style = {
			'padding': '30px',
			'paddingTop': '5px',
		};

		

		return (
			<div style={style}>
				<h1>{this.state.board} Kanban</h1>
				<KanbanBoard />
			</div>
		);
	}
}

  export default Kanban;