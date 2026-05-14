import { render, screen } from "@testing-library/react"
import { RouterProvider, createMemoryRouter } from "react-router-dom"
import { describe, expect, it } from "vitest"
import { AppProviders } from "@/app/providers"

describe("setup", () => {
  it("renders with app providers", () => {
    const router = createMemoryRouter([
      {
        path: "/",
        element: <div>X bank setup</div>,
      },
    ])

    render(
      <AppProviders>
        <RouterProvider router={router} />
      </AppProviders>,
    )

    expect(screen.getByText("X bank setup")).toBeInTheDocument()
  })
})
