import React from 'react'
import styled from 'styled-components'

import SearchFilter from 'containers/SearchFilter'

const divStyle = {
    marginTop: '10px',
};

const App = () => (
  <Div>
    <div style={divStyle}>
    <SearchFilter method="search"/>
    </div>
  </Div>
)

const Div = styled.div`
  padding: 2rem;
`

export default App
