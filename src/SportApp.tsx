import React from "react";

import SportAppProviders from "./components/SportAppProviders";
import SportAppLayout from "./components/SportAppLayout";

function SportApp() {
  return (
    <SportAppProviders>
      <SportAppLayout />
    </SportAppProviders>
  );
}

export default SportApp;
