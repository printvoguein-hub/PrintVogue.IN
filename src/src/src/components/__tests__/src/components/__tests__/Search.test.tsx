import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "../Search";
import { vi } from "vitest";

beforeEach(() => {
  global.fetch = vi.fn((input) => {
    const q = new URL(String(input), "http://localhost").searchParams.get("q") || "";
    const items = [{ id:"shirt-001", name:"Red T-Shirt", price:499, imageUrl:"/img/red.jpg", category:"Tops" }];
    const filtered = items.filter(i => i.name.toLowerCase().includes(q.toLowerCase()));
    return Promise.resolve(new Response(JSON.stringify(filtered)));
  }) as any;
});

test("shows suggestions", async () => {
  render(<Search />);
  const i = screen.getByPlaceholderText(/Search products/i);
  await userEvent.type(i, "Red");
  await waitFor(() => expect(screen.getByText(/Red T-Shirt/i)).toBeInTheDocument());
});
