import React, { Component } from 'react'
import axios from 'axios'

import Suggestions from 'components/Suggestions'

const webstory_url = "webstoryreader.web.illinois.edu";

class UpdateFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      author: '',
      title: '',
      language: '',
      new_author: '',
      new_title: '',
      new_language: '',
      ready: false,
      all: false,
      results: [] // JSON object let Suggestions.js to handle display
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
    this.setState({ready: true});
  }

  handleUpdate(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  onClick = () => {
    this.setState({all: true});
  }

  clickSubmit = () => {
    this.setState({

    }, ()=> {
      var api_url = "http://localhost:6464/SQL?q=";
      var header_str = "\x22UPDATE FF_Stories ";
      var set_str = "SET";
      if (this.state.new_author.length > 0) {
        set_str += " author=\x27" + this.state.new_author + "\x27,";
      }
      if (this.state.new_title.length > 0) {
        set_str += " title=\x27" + this.state.new_title + "\x27,";
      }
      if (this.state.new_language.length > 0) {
        set_str += " language=\x27" + this.state.new_language + "\x27 ";
      }
      var author_query = "author LIKE \x27" + this.state.author + "%\x27";
      var title_query = "title LIKE \x27" + this.state.title + "%\x27";
      var language_query = "language LIKE \x27" + this.state.language + "%\x27";
      var combine = this.state.all ? " AND " : " OR "
      var condition_str = "WHERE " + author_query + combine + title_query + combine + language_query +"\x22";
      var query_str = header_str + set_str + condition_str;

      console.log(api_url + query_str);
      axios.post(api_url + query_str)
      .then(function(response) {
        console.log("Succesfully update the database!");
      })
      console.log("Done!")
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
      <h5>Update</h5>
      <div style={divElem}>
        <form>
          <label style={labelStyle}>Author</label>
          <input
            name="author"
            placeholder="Search for author..."
            onChange={this.handleChange}
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

          <label style={labelStyle}>Author</label>
          <input
            name="new_author"
            placeholder="Update author..."
            onChange={this.handleUpdate}
          />
          <label style={labelStyle}>Title</label>
          <input
            name="new_title"
            placeholder="Update title..."
            onChange={this.handleUpdate}
          />
          <label style={labelStyle}>Language</label>
          <input
            name="new_language"
            placeholder="Update language..."
            onChange={this.handleUpdate}
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

export default UpdateFilter
