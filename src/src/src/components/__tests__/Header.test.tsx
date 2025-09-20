import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../Header";
import { AuthProvider } from "../../context/AuthContext";
import { CartProvider } from "../../context/CartContext";
import { WishlistProvider } from "../../context/WishlistContext";

const Providers = ({ children }: any) => (
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>{children}</WishlistProvider>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);

test("renders logo", () => {
  render(<Header />, { wrapper: Providers });
  expect(screen.getByText(/PrintVogue/i)).toBeInTheDocument();
});
