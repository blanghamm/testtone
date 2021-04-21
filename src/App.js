import './App.css';
import Thing from './tone/index';
import { useState, useEffect } from 'react';

function App() {
  const [on, onSet] = useState(false);
  useEffect(() => {
    on ? Thing.Start() : Thing.Stop();
  }, [on]);
  return (
    <div className='App'>
      <button onClick={() => onSet(!on)}>HeyMan</button>
    </div>
  );
}

export default App;
