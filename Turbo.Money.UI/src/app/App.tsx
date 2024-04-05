
import AppContextProvider from "./AppContextProvider";
import RouteData from "./routes/RouteData";

export default function App() {
    return (
        <div className="App">
            <AppContextProvider>
                <RouteData />
            </AppContextProvider>
        </div>
    );
}
