module.exports = {
  roots: ['<rootDir>/src'],
  testRegex: '(/__tests__/.*\\.test)\\.(ts|tsx|js)$',
  transform: {
    '^.+\\.tsx?$': 'ts-jest', "^.+\\.svg$": "<rootDir>/svgTransform.js" 
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json',
    },
  },
};
