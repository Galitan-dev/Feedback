import './App.css';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={process.env.PUBLIC_URL + '/icon.png'} className="App-logo" alt="Star" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          It's Working !
        </p>
        <a
          className="App-link"
          href={process.env.REACT_APP_API_URL + '/feedbacks'}
          target="_blank"
          rel="noopener noreferrer"
        >
          List feedbacks
        </a>
      </header>
    </div>
  );
}

export default App;
