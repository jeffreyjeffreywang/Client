import React, { Component } from 'react'
import axios from 'axios'
import Select from 'react-select'

import Suggestions from 'components/Suggestions'

const webstory_url = "webstoryreader.web.illinois.edu";

const sample_response = {
   "results":[
      {
         "title":"Service with a Smile",
         "author":"Coeur Al'Aran",
         "rating":"Fiction T",
         "language":"English",
         "genres":[
            "Romance",
            "Friendship"
         ],
         "characters":[
            "Jaune A."
         ],
         "romances":[

         ],
         "chapters":41,
         /*"chapter_read": 31,*/
         "word_count":283543,
         "reviews":6105,
         "favs":6639,
         "follows":7400,
         "published":"8/8/2017",
         "updated":"3/12",
         "id":12606073
      },
      {
         "title":"Game Over",
         "author":"Frog-kun",
         "rating":"Fiction T",
         "language":"English",
         "genres":[
            "Tragedy",
            "Family"
         ],
         "characters":[
            "Kirito/Kazuto K.",
            "Leafa/Suguha K."
         ],
         "romances":[

         ],
         "chapters":1,
         "word_count":3324,
         "reviews":90,
         "favs":343,
         "follows":94,
         "published":"10/25/2012",
         "updated":"",
         "id":8640725
      },
      {
         "title":"SAO: Nobody Dies",
         "author":"HuuskerDu",
         "rating":"Fiction T",
         "language":"English",
         "genres":[
            "Drama",
            "Romance"
         ],
         "characters":[
            "Kirito/Kazuto K.",
            "Asuna/Asuna Y.",
            "Sachi",
            "Leafa/Suguha K."
         ],
         "romances":[

         ],
         "chapters":20,
         "word_count":149784,
         "reviews":174,
         "favs":285,
         "follows":284,
         "published":"7/28/2017",
         "updated":"7/29/2018",
         "id":12590747
      },
      {
         "title":"Big Brother is Listening to You",
         "author":"Holz9364",
         "rating":"Fiction M",
         "language":"English",
         "genres":[
            "Friendship",
            "Romance"
         ],
         "characters":[
            "Harry P.",
            "Daphne G.",
            "Draco M.",
            "Gabrielle D."
         ],
         "romances":[
            [
               "Harry P.",
               "Daphne G."
            ],
            [
               "Draco M.",
               "Gabrielle D."
            ]
         ],
         "chapters":25,
         "word_count":143729,
         "reviews":328,
         "favs":801,
         "follows":593,
         "published":"1/15/2014",
         "updated":"5/17/2015",
         "id":10025439
      }
   ]
};

// Filter for SEARCH and DELETE queries
class SearchFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      author: '',
      title: '',
      language: '',
      rating: 'any',
      status: 'any',
      word_count: 0,
      chapter_count: 0,
      update_date: '1950-01-01',
      publish_date: '1950-01-01',
      like_count: 0,
      follow_count: 0,
      comment_count: 0,
      ready: false,
      all: false,
      results: [],  // JS Array
    };
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value});
  }

  onClick = () => {
    this.setState({all: true});
  }

  renderResults = () => {
    var result = [];
    for (var i=0; i<this.results.length; i++) {
      var currentResult = this.results[i];
      for (var key in currentResult) {
        result.push(<div>{key}: {currentResult[key]}</div>);
      }
    }
    return result;
  }

  clickSubmit = () => {
    this.setState({

    }, ()=> {
      var api_url = "http://localhost:6464/stories/api/search";

      // Construct JSON data to send as GET request body
      var body = {
        "title": this.state.title,
        "title_type":"CONTAINS",

        "author": this.state.author,
        "author_type":"CONTAINS",

        "rating": this.state.rating,
        "languages": [this.state.language],
        "status": [this.state.status],

        "fandoms":{
          "include all":["tag1", "tag2"],
          "include any": ["tag3", "tag4"],
          "include none":["tag5", "tag6"],
        },
        "characters":{
          "include all":["character1", "character2"],
          "include any": ["character3", "character4"],
          "include none":["character5", "charcter6"],
        },
        "relationships":{
          "include all":[
            ["character1", "character2"],
            ["character3", "character4"]
          ],
          "include any": [
            ["character5", "character6"]
          ],
          "include none":[
            ["character5", "character6"]
          ],
        },
        "other tags":{
          "include all":["tag1", "tag2"],
          "include any":["tag3", "tag4"],
          "include none":["tag5", "tag6"]
        },

        "word_count": this.state.word_count,
        "word_query_type": "GREATER",
        "chapter_count": this.state.chapter_count,
        "chapter_query_type": "GREATER",
        "publish_date": this.state.publish_date,
        "publish_date_query_type": "GREATER",
        "update_date": this.state.update_date,
        "update_date_query_type": "GREATER",
        "like_count": this.state.like_count,
        "like_query_type": "GREATER",
        "follow_count": this.state.follow_count,
        "follow_query_type": "GREATER",
        "comment_count": this.state.comment_count,
        "comment_query_type": "GREATER",
      };

      if (this.props.method == "search") {
        // HTTP GET reuest

        console.log(body);

        // What's the body of get request?
        axios.get(api_url, {body})
        .then(function(response) {
          // Assume the response data is a JSON object
          this.setState({ready: true});
          this.setState({results: response.results});
        });
      }
      console.log("Done!");
    });
  }

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
    const rowStyle = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    };
    const attributeStyle = {
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.7)',
      display: 'flex',
      flexDirection: 'column',
      borderStyle: 'solid',
      borderColor: 'black',
      margin: '5px',
    };
    const labelStyle = {
      display: 'block',
      padding: '0px 10px',
      color: 'white',
      backgroundColor: 'black',
    };
    const inputStyle = {
      display: 'block',
      backgroundColor: '#b6bac1',
      color: 'white',
      border: 'none',
    };
    const dropDownStyle = {
      background: 'url(http://i62.tinypic.com/15xvbd5.png) no-repeat 96% 0',
      height: '29px',
      width: '150px',
      overflow: 'hidden',
      backgroundColor: '#000',
    };
    const selectStyle = {
      background: 'transparent',
      border: 'none',
      fontSize: '14px',
      height: '29px',
      width: '178px',
      padding: '5px', /* If you add too much padding here, the options won't show in IE */
      color: 'white',
    };

    if (!this.state.ready) {
      return (
        <div style={divStyle}>
        <h5>{this.props.method}</h5>
        <div style={divElem}>
          <form>
            <div style={rowStyle}>
              <div style={attributeStyle}>
                <label style={labelStyle}>Author</label>
                <input
                  name="author"
                  placeholder="Search for author..."
                  onChange={this.handleChange}
                  style={inputStyle}
                />
              </div>

              <div style={attributeStyle}>
                <label style={labelStyle}>Title</label>
                <input
                  name="title"
                  placeholder="Search for title..."
                  onChange={this.handleChange}
                />
              </div>

              <div style={attributeStyle}>
                <label style={labelStyle}>Language</label>
                <input
                  name="language"
                  placeholder="Search for language..."
                  onChange={this.handleChange}
                />
              </div>

              <div style={attributeStyle}>
                <label style={labelStyle}>Maturity Rating</label>
                <div style={dropDownStyle}>
                  <select
                  name="rating"
                  onChange={this.handleChange}
                  style={selectStyle}>
                    <option value="any">Any</option>
                    <option value="general">General</option>
                    <option value="moderate">Moderate</option>
                    <option value="adult">Adult</option>
                  </select>
                </div>
              </div>

              <div style={attributeStyle}>
                <label style={labelStyle}>Completion Status</label>
                <div style={dropDownStyle}>
                  <select
                  name="status"
                  onChange={this.handleChange}
                  style={selectStyle}>
                    <option value="any">Any</option>
                    <option value="completed">Completed</option>
                    <option value="incomplete">Incomplete</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={rowStyle}>
              <div style={attributeStyle}>
                <label style={labelStyle}>Word Count</label>
                <input
                  name="word_count"
                  placeholder=">(word count)"
                  onChange={this.handleChange}
                  style={inputStyle}
                />
              </div>

              <div style={attributeStyle}>
                <label style={labelStyle}>Chapter Count</label>
                <input
                  name="chapter_count"
                  placeholder=">(chapter_count)"
                  onChange={this.handleChange}
                />
              </div>

              <div style={attributeStyle}>
                <label style={labelStyle}>Update date</label>
                <input
                  type="date"
                  name="update_date"
                  min="1950-01-01"
                  max="2018-12-31"
                  onChange={this.handleChange}
                />
              </div>

              <div style={attributeStyle}>
                <label style={labelStyle}>Published date</label>
                <input
                  type="date"
                  name="publish_date"
                  min="1950-01-01"
                  max="2018-12-31"
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div style={rowStyle}>
              <div style={attributeStyle}>
                <label style={labelStyle}>Like Count</label>
                <input
                  name="like_count"
                  placeholder=">(like_count)"
                  onChange={this.handleChange}
                />
              </div>
              <div style={attributeStyle}>
                <label style={labelStyle}>Follow Count</label>
                <input
                  name="follow_count"
                  placeholder=">(follow_count)"
                  onChange={this.handleChange}
                />
              </div>
              <div style={attributeStyle}>
                <label style={labelStyle}>Review Count</label>
                <input
                  name="comment_count"
                  placeholder=">(comment_count)"
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div style={rowStyle}>
              <label style={labelStyle}>Click to select all attributes</label>
              <input
                type="checkbox"
                onClick={this.onClick}
              />
            </div>
          </form>
        </div>

        <div style={divElem}>
          <button onClick={this.clickSubmit}>Submit</button>
        </div>
        </div>
      );
    } else {
      return (
        renderResults()
      );
    }
  }
}

export default SearchFilter
