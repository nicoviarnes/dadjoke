import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom'

class Jokes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			joke: [],
			entries: [],
			vote: null
		}
	}

	getJoke() {
	    fetch("https://icanhazdadjoke.com/", {
	    	headers: {
	    		'accept': 'application/json'
	    	}
	    })
	      .then(res => res.json())
	      .then(
	        (result) => {
	          this.setState({
	            isLoaded: true,
	            joke: result.joke
	          });
	        },
	        (error) => {
	          this.setState({
	            isLoaded: true,
	            error
	          });
	        }
	      )		
	}

	componentWillMount() {
		localStorage.getItem('results') && this.setState({
			entries: JSON.parse(localStorage.getItem('results'))
		})
	}

	componentDidMount() {
		this.getJoke();
	}

	voted(a) {
		this.setState({
			vote: a
		},
		this.updateResults
		)
	}

	updateResults() {
		const entry = {'joke': this.state.joke, 'vote': this.state.vote}
		this.setState({
			entries: this.state.entries.concat(entry)
		})

		localStorage.setItem('results', JSON.stringify(this.state.entries))
		
		this.getJoke();
	}

render() {
    const { error, isLoaded, joke } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
	      <div className="container">
	        <div className="dadjoke">
            	{this.state.joke}
       		</div>
       		<div className="buttons">
	       		<Link to='/' onClick={this.voted.bind(this, 'Funny')}>
	       			<button className="funny">    Funny!</button>{' '}
	       		</Link>
	       		<Link to='/' onClick={this.voted.bind(this, 'Not Funny')}>
	       			<button className="unfunny">Not Funny!</button>{' '}
	       		</Link>
	       	</div>
	       	<div className="stan">
	       		<img src={require('./stan.jpg')} />
	       	</div>      		
	      </div> 
      );
    }
  }
}

export default Jokes;
