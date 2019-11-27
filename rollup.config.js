import typescript from "rollup-plugin-ts";
import nodeResolve from "rollup-plugin-node-resolve";
import pkg from "./package.json";

export default {
  input: "src/main.ts",
  output: [
    // check output formats https://rollupjs.org/guide/en/
    // commonjs for node
    {
      file: pkg.main,
      format: "cjs"
    },
    // iife, browser bundle to be included via <script> tag
    {
      file: pkg.browser,
      format: "iife",
      name: "ShapediverViewerSettings"
    },
    // umd, suitable for browser and node
    {
      file: pkg.umd,
      format: "umd",
      name: "ShapediverViewerSettings"
    }
  ],
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  plugins: [nodeResolve(), typescript()]
};
