import React from "react";
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import AppContent from "./Components/AppContent";
import LoginPage from "./Components/LoginPage";

function App() {

    return (
        <Router>
            <div className="app">
                <Switch>
                    <Route path="/appContent">
                        <AppContent/>
                    </Route>
                    <Route path="/">
                        <LoginPage/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
