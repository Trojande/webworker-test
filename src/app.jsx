import React from 'react';
import '../styles/index.scss';
import FileList from './components/FileList';

class App extends React.Component {
  render() {
    return (
      <div className="home-container">
        <FileList/>
      </div>
    )
  }
}

export default App;

