import React from 'react';
import { Table } from 'reactstrap';

class JokeTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			funny: 0,
			unfunny: 0
		}
	}
	componentWillMount() {
		let data = JSON.parse(localStorage.getItem('results'))
		let funnyTotal = 0
		let unfunnyTotal = 0
		
		for (var e in data) {
			if (data[e].vote === 'Funny') {
				funnyTotal ++
			} else if (data[e].vote === 'Not Funny') {
				unfunnyTotal ++
			}
		}
		this.countVotes(funnyTotal, unfunnyTotal)
		
	}

	countVotes(f, u) {
		this.setState({
			funny: f,
			unfunny: u
		})
	}

	createTable = () => {
		let data = JSON.parse(localStorage.getItem('results'))
		let table = []
		for (var e in data) {
			let children = []
			children.push(<td>{data[e].joke}</td>)
			children.push(<td>{data[e].vote}</td>)
			table.push(<tr>{children}</tr>)
		}
		return table

	}
  render() {
	    return (
	   	<div>
	   		<Table>
	   			<tr>
	   				<td>Total Funny Votes: {this.state.funny}</td>
	   				<td className="righty">Total Not Funny Votes: {this.state.unfunny}</td>
	   			</tr>
	   		</Table>

	      	<Table responsive>
	      		<thead>
	      			<tr>
	      				<th>Joke Text</th>
	      				<th>Your Vote</th>
	      			</tr>
	      		</thead>
	      		{this.createTable()}
	      	</Table>
	    </div>
	    );
  }
}

export default JokeTable