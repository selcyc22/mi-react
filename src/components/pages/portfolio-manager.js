import React, { Component } from 'react';
import axios from 'axios';

import PortfolioSidebarList from '../portfolio/portfolio-sidebar-list';
import PortfolioForm from '../portfolio/portfolio-form';

export default class PortfolioManager extends Component {
    constructor() {
        super();

        this.state = {
            PortfolioItems:[],
            PortfolioToEdit:{}
        };

        this.handleNewFormSubmission = this.handleNewFormSubmission.bind(this);
        this.handleEditFormSubmission = this.handleEditFormSubmission.bind(this);
        this.handleFormSumbmissionError = this.handleFormSumbmissionError.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.clearPortfolioToEdit = this.clearPortfolioToEdit.bind(this);
    }

    clearPortfolioToEdit() {
        this.setState({
            PortfolioToEdit: {}
        });
    }

    handleEditClick(portfolioItem) {
        this.setState({
            PortfolioToEdit: portfolioItem
        });
    }

    handleDeleteClick(portfolioItem) {
        axios.delete(
            `https://api.devcamp.space/portfolio/portfolio_items/${portfolioItem.id}`, 
            {withCredentials:true }
        ).then(response => {
            this.setState({
                PortfolioItems: this.state.PortfolioItems.filter(item => {
                    return item.id !== portfolioItem.id;
                })
            });

            return response.data;

        }).catch(error => {
            console.log("handleDeletClick error", error);
        });
    }

    handleEditFormSubmission() {
        this.getPortfolioItems();
    }

    handleNewFormSubmission(portfolioItem) {
        this.setState({
            PortfolioItems: [portfolioItem].concat(this.state.PortfolioItems)
        });
    }

    handleFormSumbmissionError(error) {
        console.log("handleFormSumbmissionError error", error);
    }

    getPortfolioItems() {
        axios.get("https://selcyc.devcamp.space/portfolio/portfolio_items", {
            widthCredentials:true
        }).then(response => {
            this.setState({
                PortfolioItems: [...response.data.portfolio_items]
            });
        }).catch(error => {
            console.log("error in get PortfolioItems", error);
        })
    }

    componentDidMount() {
        this.getPortfolioItems();
    }

    render() {
        return (
            <div className="portfolio-manager-wrapper">
                <div className="left-column">
                    <PortfolioForm 
                        handleNewFormSubmission={this.handleNewFormSubmission}
                        handleEditFormSubmission={this.handleEditFormSubmission}
                        handleFormSumbmissionError={this.handleFormSumbmissionError}
                        clearPortfolioToEdit={this.clearPortfolioToEdit}
                        PortfolioToEdit={this.state.PortfolioToEdit}
                    />
                </div>

                <div className="right-column">
                <PortfolioSidebarList handleDeleteClick={this.handleDeleteClick} data={this.state.PortfolioItems} handleEditClick={this.handleEditClick}/>
                </div>
            </div>
        );
    }
}