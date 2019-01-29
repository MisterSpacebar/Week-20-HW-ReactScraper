import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { List, ListItem } from "./components/List";

var axios = require("axios");
var cheerio = require("cheerio");

class App extends Component {
  state = {
    articles: [],
    identity: 1
  }

  componentDidMount () { 
    scrape();
  }

  scrape = () => {
    axios.get("https://www.guildwars2.com/en/").then(function(response) {
      var $ = cheerio.load(response.data);
      console.log(response.data);
  
      $("ul li .bd h3").each((i,element) => {
        var result = {};
  
        result.id = this.state.identity;
        result.title = $(this).children("a").text();
        console.log(result.title);
        result.link = $(this).children("a").attr("href");
        console.log(result.link);
  
        this.setState({articles: this.state.articles.push(result)});
        })
        .then(dbArticle => {
          // View the added result in the console
          console.log(dbArticle);
          console.log("GW2 Scrape");
          this.setState({identity:this.state.identity+1});
        })
        .catch(err => {
          // If an error occurred, log it
          console.log(err);
        });
    });
  }

  render() {
    return (
      <div className='container'>
        <h1 className='big-title'>React Scraper</h1>
        <div className='jumbotron'>
        {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <a href={this.state.article._id}>
                      <strong>
                        {this.article.title}
                      </strong>
                    </a>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
        </div>
      </div>
    );
  }
}

export default App;
