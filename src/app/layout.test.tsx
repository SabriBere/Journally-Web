// layout.test.tsx
import { render, screen } from "@testing-library/react";

jest.mock("next-auth", () => ({
    getServerSession: jest.fn().mockResolvedValue(null),
}));

jest.mock("./api/provider/Credentials", () => ({
    authOptions: {},
}));

jest.mock("@/commons/Navbar/Navbar", () => ({
    __esModule: true,
    default: () => <nav data-testid="mocked-navbar" />,
}));

jest.mock("@/commons/Footer/Footer", () => ({
    __esModule: true,
    default: () => <footer data-testid="mocked-footer" />,
}));

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
    test("renderiza los children dentro del Provider", async () => {
        const layout = await RootLayout({
            children: <h1>Hola Journally</h1>,
        });

        render(layout.props.children.props.children);

        expect(screen.getByText("Hola Journally")).toBeInTheDocument();
        expect(screen.getByTestId("mocked-provider")).toBeInTheDocument();
    });
});
