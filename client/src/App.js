import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import HomePage from "./pages/HomePage";
import FeedBackPage from "./pages/FeedBackPage";
import Navigation from "./components/NavBar";
import "./App.css"

function App() {
    return (
        <div className="bg">
            <div className="app">
                <Router>
                    <Navigation/>
                    <Switch>
                        <Route path="/" exact component={HomePage}/>
                        <Route path="/feedback" exact component={FeedBackPage}/>
                        <Redirect to="/"/>
                    </Switch>
                </Router>
            </div>
        </div>
    );
}

export default App;
