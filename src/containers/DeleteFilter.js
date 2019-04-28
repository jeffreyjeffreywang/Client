import React, { Component } from 'react'
import axios from 'axios'
import Select from 'react-select'

import Suggestions from 'components/Suggestions'

const webstory_url = "webstoryreader.web.illinois.edu";

// Filter for SEARCH and DELETE queries
class SearchFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      author: '',
      title: '',
      language: '',
      ready: false,
      all: false,
      results: [] // JSON object let Suggestions.js to handle display
    };
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value});
    this.setState({ready: true});
  }

  onClick = () => {
    this.setState({all: true});
  }

  clickSubmit = () => {
    this.setState({

    }, ()=> {
      var api_url = "http://localhost:6464/SQL?=";
      var author_query = "author LIKE \x27" + this.state.author + "%\x27";
      var title_query = "title LIKE \x27" + this.state.title + "%\x27";
      var language_query = "language LIKE \x27" + this.state.language + "%\x27";
      var combine = this.state.all ? " AND " : " OR "
      if (this.props.method == "search") {
        // HTTP GET reuest
        var header_str = "\x22SELECT * FROM FF_Stories WHERE ";
        var query_str = header_str + author_query + combine + title_query + combine + language_query;

        console.log(api_url + query_str);
        axios.get(api_url + query_str)
        .then(function(response) {
          // Assume the response data is in JSON format
          this.state.results = response.results.split("\n");
        });
      } else if (this.props.method == "delete") {
        var header_str = "\x22DELETE FROM FF_Stories WHERE "
        var query_str = header_str + author_query + combine + title_query + combine + language_query;

        console.log(api_url + query_str);
        axios.post(api_url + query_str)
        .then(function(response) {
          console.log("Successfully delete data from the database!");
        })
      }
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
      display: 'block',
      padding: '0px 10px',
    };
    const inputStyle = {
      display: 'block',
    };
    return (
      <div style={divStyle}>
      <h5>{this.props.method}</h5>
      <div style={divElem}>
        <form>
          <label style={labelStyle}>Author</label>
          <input
            name="author"
            placeholder="Search for author..."
            onChange={this.handleChange}
            style={inputStyle}
          />
          <label style={labelStyle}>Title</label>
          <input
            name="title"
            placeholder="Search for title..."
            onChange={this.handleChange}
          />
          <label style={labelStyle}>Language</label>
          <input
            name="language"
            placeholder="Search for language..."
            onChange={this.handleChange}
          />
          <label style={labelStyle}>Click to select all attributes</label>
          <input
            type="checkbox"
            onClick={this.onClick}
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

export default SearchFilter
