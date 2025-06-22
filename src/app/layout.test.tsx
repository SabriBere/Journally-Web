// layout.test.tsx
import { render, screen } from "@testing-library/react";

// Mock de next/font
jest.mock("next/font/google", () => ({
    Caveat: () => ({ variable: "font-caveat" }),
    Inter: () => ({ variable: "font-inter" }),
}));

// Mock de Providers
jest.mock("./providers", () => ({
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="mocked-provider">{children}</div>
    ),
}));

// Importar después de los mocks
import RootLayout from "./layout";

describe("RootLayout", () => {
    test("renderiza los children dentro del Provider", () => {
        render(
            <RootLayout>
                <h1>Hola Journally</h1>
            </RootLayout>
        );

        expect(screen.getByText("Hola Journally")).toBeInTheDocument();
        expect(screen.getByTestId("mocked-provider")).toBeInTheDocument();
    });
});
