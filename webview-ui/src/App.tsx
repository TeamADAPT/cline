import React from 'react';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>ADAPTdev Dashboard</h1>
      </header>
      <main>
        <section className="control-panel">
          {/* TODO: Add start/stop buttons */}
        </section>
        <section className="task-list">
          {/* TODO: Implement task list view */}
        </section>
        <section className="log-display">
          {/* TODO: Add real-time log display */}
        </section>
      </main>
    </div>
  );
}

export default App;
