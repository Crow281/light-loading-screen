// rollup.config.mjs
import { nodeResolve } from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import del from "rollup-plugin-delete";
import includePaths from "rollup-plugin-includepaths";
import externals from "rollup-plugin-node-externals";
import pkg from "./package.json" assert {type: "json"};

export default {
	plugins: [
	    //Delete previous build.
	    del({
	        targets: "dist/*"
	    }),
	    //Do not integrate 3rd party dependencies into the build.
	    externals({
	        deps: true
	    }),
	    //Allows searching 3rd party modules.
	    nodeResolve({
	        extensions: [
	            ".js",
	            ".jsx",
	            ".ts",
	            ".tsx"
	        ]
	    }),
		//Makes it possible to import modules using src as the base path.
		includePaths({
            paths: ["src"],
            extensions: [
	            ".js",
	            ".jsx",
	            ".ts",
	            ".tsx"
	        ]
		}),
	    //Converts CommonJS modules into ES modules.
	    commonjs(),
	    //Ensures backwards compatibility
	    babel({
	        babelHelpers: "runtime",
	        exclude: "**/node_modules/**",
	        extensions: [
	            ".js",
	            ".jsx",
	            ".ts",
	            ".tsx"
	        ]
	    })
	],
	input: "src/index.ts",
	output: [
		{
			file: pkg.exports["."].require,
			format: "cjs"
		},
		{
			file: pkg.exports["."].import,
			format: "es"
		}
	]
};

