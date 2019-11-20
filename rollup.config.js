import typescript from "rollup-plugin-typescript3";
import nodeResolve from "rollup-plugin-node-resolve";
import pkg from "./package.json";

export default {
  input: "src/main.ts",
  entry: "src/main.ts",
  output: [
    // check output formats https://rollupjs.org/guide/en/
    // commonjs for node
    {
      file: pkg.node,
      format: "cjs"
    },
    // iife, browser bundle to be included via <script> tag
    {
      file: pkg.module,
      format: "iife",
      name: "ShapediverViewerSettings"
    },
    // umd, suitable for browser and node
    {
      file: pkg.main,
      format: "umd",
      name: "ShapediverViewerSettings"
    }
  ],
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  plugins: [nodeResolve(), typescript()]
};
