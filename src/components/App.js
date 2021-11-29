import React, { Component } from "react";
import moment from "moment";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PortfolioContainer from "./portfolio/portfolio-container";
import NavigationContainer from "./navigation/navigation-container";
import Home from "./pages/home";
import About from "./pages/about";
import contact from "./pages/contact";
import blog from "./pages/blog";
import PortfolioDetail from "./portfolio/portfolio-detail";
import NoMatch from "./pages/no-match";

export default class App extends Component {
  constructor(){
    super();

    this.getPortfolioItems = this.getPortfolioItems.bind(this);
  }
  getPortfolioItems(){
    axios
      .get("https://selcyc.devcamp.space/portfolio/portfolio_items5")
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    this.getPortfolioItems();
    return (
      <div className="app">
        <Router>
          <div>
            <h1>Jordan Hudgens Portfolio</h1>
            <div>{moment().format("MMMM Do YYYY, h:mm:ss a")}</div>
            <NavigationContainer />

            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about-me" component={About} />
              <Route path="/contact" component={contact} />
              <Route path="/blog" component={blog} />
              <Route exact path="/portfolio/:slug" component={PortfolioDetail}/>
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>

      </div>
    );
  }
}