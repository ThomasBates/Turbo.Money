import React from 'react'

import AppContextProvider from "./AppContextProvider";
import RouteData from "./RouteData";

function App() {
    return (
        <div className="App">
            <AppContextProvider>
                <RouteData />
            </AppContextProvider>
        </div>
    );
}

export default App;