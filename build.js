//@ts-check

import { context, build } from "esbuild";
import { promises } from "fs";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-undef
var args = process.argv.slice(2);

const watch = args.includes("-w");

/**
 * @type import("esbuild").BuildOptions
 */
const commonOptions = {
  bundle: true,
  minify: !watch,
  minifyWhitespace: !watch,
  minifySyntax: !watch,
  sourcemap: watch,
  target: "es2020",
  platform: "browser",
  format: "esm",
};

/**
 * @type import("esbuild").BuildOptions
 */
const appOptions = {
  ...commonOptions,
  entryPoints: ["src/app.js"],
  outfile: `wwwroot/scripts/app.js`,
  plugins: [
    {
      name: "pwa-build-informer",
      setup(build) {
        build.onEnd((result) => {
          if (result.errors.length === 0) console.log("Success");
        });
      },
    },
    {
      name: "pwa-sw-builder",
      setup(currentBuild) {
        currentBuild.onEnd((result) => {
          if (result.errors.length === 0) {
            build(swOptions);
          }
        });
      },
    },
  ],
};

/**
 * @type import("esbuild").BuildOptions
 */
const swOptions = {
  ...commonOptions,
  entryPoints: ["service-worker.js"],
  outfile: `wwwroot/service-worker.js`,
  plugins: [
    {
      name: "env",
      setup(build) {
        const timestamp = new Date().getTime();
        // https://esbuild.github.io/plugins/#using-plugins
        build.onResolve({ filter: /^build$/ }, (args) => ({
          path: args.path,
          namespace: "build-ns",
        }));
        build.onLoad({ filter: /.*/, namespace: "build-ns" }, () => ({
          contents: JSON.stringify({ timestamp }),
          loader: "json",
        }));
        build.onEnd((result) => {
          if (result.errors.length === 0) {
            console.log("SW generated, timestamp: " + timestamp);
          }
        });
      },
    },
  ],
};

if (!watch) {
  await build(appOptions);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line no-undef
  process.exit();
}

let ctx = await context(appOptions);

await ctx.watch();

let { host, port } = await ctx.serve({
  servedir: "wwwroot",
  host: "localhost",
});
console.log(`Listen on ${host}:${port}`);
