import React, { Component } from "react";
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import BlogItem from "../blog/bolg-item";
import BlogModal from "../modals/blog-modal";
import Icons from "../../helpers/icons";

class BLog extends Component {
  constructor(){
    super();

    this.state = {
      blogItems: [],
      totalCount: 0,
      currentPage: 0,
      isLoading: true,
      blogModalIsOpen: false
    };

    this.getBlogItems = this.getBlogItems.bind(this);
    this.onScroll = this.onScroll.bind(this);
    window.addEventListener("scroll", this.onScroll, false);
    this.handleNewBlogClick = this.handleNewBlogClick.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleSuccessfullNewBlogSubmission = this.handleSuccessfullNewBlogSubmission.bind(this);
  }

  handleSuccessfullNewBlogSubmission(blog) {
    this.setState({
      blogModalIsOpen: false,
      blogItems: [blog].concat(this.state.blogItems)
    });
  }

  handleModalClose() {
    this.setState({
      blogModalIsOpen: false
    });
  }

  handleNewBlogClick() {
    this.setState({
      blogModalIsOpen: true
    });
  }

  onScroll() {

    if(this.state.isLoading || this.state.blogItems.length === this.state.totalCount) {
      return;
    }


    if (window.innerHeight + document.documentElement.scrollTop +1>= document.documentElement.offsetHeight) {
      this.getBlogItems();
    }
  }

  getBlogItems() {
    this.setState({
      currentPage: this.state.currentPage + 1
    });

    axios.get(`https://selcyc.devcamp.space/portfolio/portfolio_blogs?page=${this.state.currentPage}`, {withCredentials: true}
    ).then(response => {
      console.log("getting", response.data);
      this.setState({
        blogItems: this.state.blogItems.concat(response.data.portfolio_blogs),
        totalCount:response.data.meta.total_records,
        isLoading: false
      });
    })
    .catch(error => {
      console.log("error getBlogItems", error);
    });
  }

  componentWillMount() {
    this.getBlogItems();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
  }

  render(){
    const blogRecords = this.state.blogItems.map(blogItem => {
      return <BlogItem key={blogItem.id} blogItem={blogItem} />
    });

    return (
      <div className="blog-container">
        <BlogModal handleSuccessfullNewBlogSubmission={this.handleSuccessfullNewBlogSubmission}
        handleModalClose={this.handleModalClose} modalIsOpen={this.state.blogModalIsOpen} />

         
          <div className="new-blog-link">
            {this.props.loggedInStatus === "LOGGED_IN" ?
              <a onClick={this.handleNewBlogClick}>
                <FontAwesomeIcon icon="plus-circle" /> 
              </a>
            : null}
          </div>

        <div className="content-container">{blogRecords}</div>

        {this.state.isLoading ? (
          <div className="content-loder">
            <FontAwesomeIcon icon="ghost" spin />
          </div>
        ) : null }
      </div>
    );
  }
}

export default BLog;