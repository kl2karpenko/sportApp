import React from "react";

import { render, screen } from "@testing-library/react";
import SportApp from "./SportApp";

test("renders learn react link", () => {
  render(<SportApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
