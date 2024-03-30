import React from 'react'

import AppContextProvider from "./AppContextProvider";
import RouteData from "./RouteData";

export default function App() {
    return (
        <div className="App">
            <AppContextProvider>
                <RouteData />
            </AppContextProvider>
        </div>
    );
}
