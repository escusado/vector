import React from "react";
import { FullContainer } from "src/dependencies/GlobalStyles";

import VectorEngine from "src/lib/VectorEngine";

import RoverApp from "src/apps/RoverApp";

const HomeView = () => (
  <FullContainer>
    <VectorEngine>
      <RoverApp />
    </VectorEngine>
  </FullContainer>
);

export default HomeView;
