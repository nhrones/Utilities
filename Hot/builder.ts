// deno-lint-ignore-file
import { esbuild, denoPlugin } from "./deps.ts";
import * as CFG from './config.ts'

/** Build an entrypoint into a single ESM `bundle.js` output. */
export const build = async () => {
   await esbuild.build({
      /// @ts-ignore: outdated types
      plugins: [denoPlugin()],
      entryPoints: CFG.Entry,
      outfile: CFG.Out,
      bundle: true,
      minify: CFG.Minify,
      banner: { js: '// deno-lint-ignore-file' },
      format: "esm"
   }).catch((e: any) => console.info(e));
   esbuild.stop();
}
