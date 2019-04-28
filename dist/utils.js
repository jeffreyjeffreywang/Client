/* Global variables */
var current_story_id = -1;

var clickedReadingList = false;
function clickReadingList() {
  if (clickedReadingList) {
    document.getElementById("sidenav").style.display = "none";
    clickedReadingList = false;
  } else {
    var elem = document.getElementById("sidenav")
    elem.style.display = "flex";
    clickedReadingList = true;
    axios.get("http://localhost:6464/stories/api/read_list")
    .then(function(response) {
      for (var key in response) { // key: to_read, reading, read
        document.getElementById(key).innerHTML += '<div id="reading-list-elem" onclick="getStory(' + response[key]['url'] + ', ' +response[key]['story_id'] + ')">'  + response[key]['title'] + ' ' + response[key]['chapters_read'] + '</div>';
      }
    });
  }
}

function displayRead(num) {
  var to_read = document.getElementById("to_read");
  var reading = document.getElementById("reading");
  var read = document.getElementById("read");
  to_read.style.display = "none";
  reading.style.display = "none";
  read.style.display = "none";
  if (num === 1) {
    to_read.style.display = "block";
  } else if (num === 2) {
    reading.style.display = "block";
  } else if (num === 3) {
    read.style.display = "block";
  }
}

function getStory(url, story_id) {
  axios.get(url)
  .then(function(response) {
    document.getElementById("main-content").innerHTML = response;
    current_story_id = story_id;
  });
}

function updateRead(num) {
  if (story_id >= 0) {
    if (num == 1) {
      axios.post("http://localhost:6464/stories/api/read_list", {"type": "TO_READ", "story_id": story_id});
    } else if (num == 2) {
      axios.post("http://localhost:6464/stories/api/read_list", {"type": "MARK_READ", "story_id": story_id});
    } else if (num == 3) {
      axios.post("http://localhost:6464/stories/api/read_list", {"type": "DROP", "story_id": story_id});
    }
  }
}

var clickedRating = false;
function clickRating() {
  if (clickedRating) {
    document.getElementById("ratings-column").style.display= "none";
    clickedRating = false;
  } else {
    document.getElementById("ratings-column").style.display = "block";
    clickedRating = true;
  }
}

var clickedSearch = false;
function clickSearch() {
  if (clickedSearch) {
    document.getElementById("root").style.display = "none";
    clickedSearch = false;
  } else {
    document.getElementById("root").style.display = "block";
    clickedSearch = true;
  }
}
