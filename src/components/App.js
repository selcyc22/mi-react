import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from 'axios';

import PortfolioContainer from "./portfolio/portfolio-container";
import NavigationContainer from "./navigation/navigation-container";
import Home from "./pages/home";
import About from "./pages/about";
import contact from "./pages/contact";
import blog from "./pages/blog";
import PortfolioDetail from "./portfolio/portfolio-detail";
import Auth from "./pages/auth";
import NoMatch from "./pages/no-match";
import PortfolioManager from "./pages/portfolio-manager";

import "./style/main.scss";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus:"NOT_LOGGED_IN"
    };

    this.handleSuccesfulLogin = this.handleSuccesfulLogin.bind(this);
    this.handleUnsuccesfulLogin = this.handleUnsuccesfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
  }
  handleSuccesfulLogin() {
    this.setState ({
      loggedInStatus:"LOGGED_IN"
    });
  }

  handleUnsuccesfulLogin(){
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }

  handleSuccessfulLogout() {
    this.setState ({
      loggedInStatus:"NOT_LOGGED_IN"
    });
  }

  checkLoginStatus(){
    return axios.get("https://api.devcamp.space/logged_in", {
      withCredentials:true
    })
      .then(response => {
        const loggedIn = response.data.logged_in;
        const loggedInStatus = this.state.loggedInStatus;

        if (loggedIn && loggedInStatus === "LOGGED_IN") {
          return loggedIn;
        } else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
          this.setState({
            loggedInStatus: "LOGGED_IN"
          });
        }else if (!loggedIn && loggedInStatus === "LOGGED_IN") {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN"
          });
        }
      })
      .catch(error => {
          console.log("Error", error);
      });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  authorizedPages() {
    return [
      <Route path="/portfolio-manager" component={PortfolioManager} />,
    ];
  }

  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <NavigationContainer 
            loggedInStatus={this.state.loggedInStatus} 
            handleSuccessfulLogout={this.handleSuccessfulLogout}
            />

            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/auth" render={props => (<Auth {...props} handleSuccesfulLogin={this.handleSuccesfulLogin}handleUnsuccesfulLogin={this.handleUnsuccesfulLogin}/>)} />
              <Route path="/about.js" component={About} />
              <Route path="/contact" component={contact} />
              <Route path="/blog" component={blog} />

              {this.state.loggedInStatus === "LOGGED_IN" ? this.authorizedPages(): null}

              <Route exact path="/portfolio/:slug" component={PortfolioDetail}/>
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>

      </div>
    );
  }
}