import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Footer from "../Footer";

test("renders footer links", () => {
  render(<Footer />, { wrapper: BrowserRouter });
  expect(screen.getByText(/Size Guide/i)).toBeInTheDocument();
});
