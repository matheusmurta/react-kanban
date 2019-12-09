import React from "react";
export class Board extends React.Component {

	redirect() {
		alert("time to redirect");
	}

	createBoard() {
		//get name
		//post
	}

	render() {

		const style = {
			'padding': '30px'
		}

		return (
			<div style={style}>
				<h1>Submit a board Name</h1>
				<input placeholder="Board Name"></input>
				<button onClick={this.redirect} >Save</button>
			</div>
		);
	}
}

  export default Board;