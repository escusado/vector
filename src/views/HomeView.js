import React from "react";
import { FullContainer } from "src/dependencies/GlobalStyles";

import VectorEngine from "src/lib/VectorEngine";
import DroneVectorApp from "src/apps/DroneVectorApp";

const HomeView = () => (
  <FullContainer>
    <VectorEngine>
      <DroneVectorApp />
    </VectorEngine>
  </FullContainer>
);

export default HomeView;
