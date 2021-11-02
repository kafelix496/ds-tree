import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

const common = (isProd) => ({
  plugins: [
    resolve(),
    babel({
      babelrc: true,
      exclude: 'node_modules/**',
      babelHelpers: 'bundled'
    }),
    isProd && terser(),
    typescript({
      clean: true,
      useTsconfigDeclarationDir: true,
      tsconfig: './tsconfig.bundle.json'
    })
  ]
})

const results = (umdName, external) => [{
  input: `src/index.ts`,
  external: Object.keys(external),
  output: {
    file: pkg.module,
    format: 'es'
  }
}, {
  input: `src/index.ts`,
  external: Object.keys(external),
  output: {
    file: pkg.main,
    format: 'cjs'
  }
}, {
  input: `src/index.ts`,
  external: Object.keys(external),
  output: {
    file: pkg.unpkg,
    format: 'umd',
    name: umdName,
    globals: external
  }
}]

export default results('kaDsTree', {}).map((object) => ({
  ...common(true),
  ...object
}))
