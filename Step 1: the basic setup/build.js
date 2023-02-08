//@ts-check

import { context, build } from "esbuild";

// @ts-ignore
var args = process.argv.slice(2);

const watch = args.includes("-w");

/**
 * @type import("esbuild").BuildOptions
 */
const options = {
  entryPoints: ["src/app.js"],
  bundle: true,
  minify: true,
  minifyWhitespace: true,
  minifySyntax: true,
  sourcemap: true,
  outfile: `wwwroot/scripts/app.js`,
  target: "es2020",
  platform: "browser",
  format: "esm",
  plugins: [
    {
      name: "pwa-build-informer",
      setup(build) {
        build.onEnd((result) => {
          if (result.errors.length === 0) console.log("Success");
        });
      },
    },
  ],
};

if (!watch) {
  await build(options);
  // @ts-ignore
  process.exit();
}

let ctx = await context(options);

await ctx.watch();

let { host, port } = await ctx.serve({
  servedir: "wwwroot",
  host: "localhost",
});
console.log(`Listen on ${host}:${port}`);
