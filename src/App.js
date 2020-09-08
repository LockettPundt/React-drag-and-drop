import React from 'react';
import './App.css';
import List from './components/List'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
      <List />
    </div>
    </DndProvider>
  );
}

export default App;
