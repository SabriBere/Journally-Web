//herlper para la configuración con next
import nextJest from "next/jest"

//toma el directorio base del proyecto para bucar next.config.js
const createJestConfig = nextJest({
    dir: "./"
})

//configuración personalizada de jest
const customJestConfig = {
    setUpFilesAfterEnv: ["<rootDir>/jest.setup.js"], //cargue los test una vez seteado el entorno
    testEnvironment: "jest-enviroment-jsdom", //podría ser solo jest
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    }, //permite conciderar los imports con alias
    testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
}

export default createJestConfig(customJestConfig)