import React from 'react';
import './result.css';
import axios from "axios";

const dotenv = require('dotenv');
const env = dotenv.config().parsed;

export default class ResultLeft extends React.Component {
  state = {
    source: [],
    title: [],
    author: [],
    url: []
  }

  componentDidMount() {
    const APIkey = process.env.REACT_APP_API_KEY

    axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?q=covid&api-key=" + APIkey)
      .then(res => {

        console.log("response", res.data.response.docs)
        this.setState({ source:res.data.response.docs })
        
      })
  };

  render() {
    return (
      <>
        {this.state.source.map((doc, idx) => {
          if (idx < 10) {
            return (
              <div className="col-sm-12 col-md-5 newsCol">
                <p><span className="newsTitle"> Title:</span> <a href={doc.web_url} target="_blank" rel="noopener noreferrer" className="newsTitleLine">{doc.headline.main}</a></p>
                <p className="newsDescription">{doc.type_of_material}</p>
                <p className="newsDescription">{doc.snippet}</p>
              </div>
            )
          }
        })}
      </>
    )
  }
}
