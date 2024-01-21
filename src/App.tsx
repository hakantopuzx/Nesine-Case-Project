import React from 'react';
import MatchList from './components/matchList';
import { MatchProvider } from './components/MatchContext';

function App() {
    return (
        <div className="App">
            <MatchProvider>
                <MatchList />
            </MatchProvider>
        </div>
    );
}

export default App;
