import React, { Component } from 'react'
import axios from 'axios'

import Suggestions from 'components/Suggestions'

const webstory_url = "webstoryreader.web.illinois.edu";

// Filter for SEARCH and DELETE queries
class InsertFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      url: '',
      ready: false,
      all: false,
      results: [] // JSON object let Suggestions.js to handle display
    };
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange = () => {
    this.setState({ url: this.search.value });
    this.setState({ready: true});
  }

  clickSubmit = () => {
    this.setState({

    }, ()=> {
      var api_url = "http://localhost:6464/URL?=";
      var query_str = this.state.url;
        console.log(api_url + query_str);
        axios.get(api_url + query_str)
        .then(function(response) {
          // Assume the response data is in JSON format
          this.state.results = response.results.split("\n");
        });

      console.log("Done!");
    });
  }

  // SELECT count(titles) FROM FF_Stories WHERE author LIKE '%s'

  render() {
    const divStyle = {
      display: 'flex',
      justifyContent: 'space-around',
      background: '#a0ffff',
      padding: '10px',
      borderRadius: '5px',
    };
    const divElem = {
      padding: '10px',
    };
    const labelStyle = {
      padding: '0px 10px',
    };
    return (
      <div style={divStyle}>
        <h5>Insert</h5>
        <div style={divElem}>
          <form>
            <input
            placeholder="Insert URL..."
            ref={input => this.search = input}
            onChange={this.handleChange}
            />
          </form>
        </div>

        <div style={divElem}>
          <button onClick={this.clickSubmit}>Submit</button>
        </div>
      </div>
    )
  }
}

export default InsertFilter
