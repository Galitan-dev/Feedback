import { Component } from 'react';
import './App.css';
import Feedback from './feedback/Feedback';

export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = { feedbacks: [] };
  }

  async componentDidMount() {
    const response = await fetch(process.env.REACT_APP_API_URL + '/feedbacks');
    const data = await response.json();
    this.setState({ feedbacks: data });
  }

  async filter(search) {
    const response = await fetch(process.env.REACT_APP_API_URL + '/feedbacks');
    /**  @type {{ profilePicture: string, author: string, title: string, body: string, createdAt: string, stars: number }[]} */
    const data = await response.json();

    let inverse = search.startsWith('!');
    if (inverse) search = search.substr(1);
    search = search.replace(/\s+/g, '').toLowerCase();
    
    this.setState({

      feedbacks: data.filter(f => {
        if (f.author.replace(/\s+/g, '').toLowerCase().includes(search)) return !inverse;
        if (f.body.replace(/\s+/g, '').toLowerCase().includes(search)) return !inverse;
        if (f.title.replace(/\s+/g, '').toLowerCase().includes(search)) return !inverse;
        return inverse;
      })
      
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-search">
          <form onSubmit={(e) => { this.filter(e.target.elements.search.value); e.preventDefault()}}>
            <input type="text" name="search" className="App-search-input" placeholder="Try 'nice', 'design', '!robot'..." />
            <input type="submit" value="Search" />
          </form>
        </div>
        <div className="App-feedbacks">
          {this.state.feedbacks.map((feedback) => <Feedback key={feedback._id} author={feedback.author} body={feedback.body} createdAt={new Date(feedback.createdAt)} profilePicture={feedback.profilePicture} stars={feedback.stars} title={feedback.title} />)}
        </div>
      </div>
    );
  }
}
