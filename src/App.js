import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomeView from "src/views/HomeView";
import RoverView from "src/views/RoverView";

const RootContainer = styled.div`
  width: 100%;
  height: 100%;
`;

function App() {
  return (
    <RootContainer>
      <Router>
        <Switch>
          <Route exact path="/" component={HomeView} />
          <Route exact path="/rover" component={RoverView} />
        </Switch>
      </Router>
    </RootContainer>
  );
}

export default App;
