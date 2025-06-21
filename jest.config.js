//herlper para la configuración con next
import nextJest from "next/jest.js"

//toma el directorio base del proyecto para bucar next.config.js
const createJestConfig = nextJest({
    dir: "./"
})

//configuración personalizada de jest
const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    }, //permite conciderar los imports con alias

    testMatch: [
        "**/__tests__/**/*.test.[jt]s?(x)",
        "**/?(*.)+(spec|test).[jt]s?(x)" //si quisiera una covertura más amplia
    ]
}

export default createJestConfig(customJestConfig)