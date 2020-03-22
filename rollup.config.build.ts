import { clean, copy, importStyles } from "@appnest/web-config";
import ts from "@wessberg/rollup-plugin-ts";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import { join, resolve } from "path";
import precss from "precss";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import progress from "rollup-plugin-progress";
import pkg from "./package.json";

const folders = {
	src: resolve(__dirname, "src/lib"),
	dist: resolve(__dirname, "dist")
};

const files = {
	src_index: join(folders.src, "index.ts"),
	web_dialog: join(folders.src, "web-dialog.ts"),
	util: join(folders.src, "util.ts"),
	open_dialog: join(folders.src, "open-dialog.ts"),

	// Package
	src_package: resolve("package.json"),
	dist_package: join(folders.dist, "package.json"),

	// Readme
	src_readme: resolve("README.md"),
	dist_readme: join(folders.dist, "README.md")
};

export default {
	input: {
		index: files.src_index,
		"web-dialog": files.web_dialog,
		"open-dialog": files.open_dialog,
		"util": files.util
	},
	output: [
		{
			dir: folders.dist,
			format: "esm"
		}
	],
	treeshake: false,
	plugins: [
		clean({
			targets: [
				folders.dist
			]
		}),
		copy({
			resources: [
				[files.src_package, files.dist_package],
				[files.src_readme, files.dist_readme]
			]
		}),
		progress(),
		nodeResolve({
			modulesOnly: false,
			mainFields: [
				"module",
				"browser",
				"jsnext:main"
			]
		}),
		importStyles({
			plugins: [
				precss(),
				autoprefixer(),
				cssnano()
			]
		}),
		ts({
			transpiler: "typescript",
			tsconfig: "tsconfig.build.json",
			exclude: ["node_modules/**/*.*"],
			browserslist: false
		}),
		commonjs({
			include: "**/node_modules/**"
		})
	],
	external: [
		...(Object.keys(pkg.dependencies || {})),
		...(Object.keys(pkg.devDependencies || {})),
		"tslib"
	]
};