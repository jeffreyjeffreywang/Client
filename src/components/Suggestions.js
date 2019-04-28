import React from 'react'

const Suggestions = (props) => {
  const options = props.results.map(r => (
    <li>
      {r.title} {r.author}
    </li>
  ))
  return <ul>{options}</ul>
}

export default Suggestions
