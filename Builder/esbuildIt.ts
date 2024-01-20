
import * as esBuild from "https://deno.land/x/esbuild@v0.17.11/mod.js";
import { denoPlugin } from "https://deno.land/x/esbuild_deno_loader@0.6.0/mod.ts";

type Config = {
   Out: string
   Entry: string[]
   Minify: boolean
}


/** 
 * builds and bundles an entrypoint into a single ESM output. 
 * @param {Config} cfg - the configuration to build from, object that contains:        
 *  - Out: string - the folder to place the bundle in (defaults to 'dist')   
 *  - Entry: string[] - the entry points to build from (defaults to ["./src/main.ts"])   
 *  - Minify: boolean - whether or not to minify the bundle
 * @example 
 * 
 */ 
export async function buildIt(cfg: Config) {
   console.log(`Bundling ${cfg.Entry} to ${cfg.Out} - minified = ${cfg.Minify}`)    
    await esBuild.build({
        // @ts-ignore: outdated types
        plugins: [denoPlugin({})],
        entryPoints: cfg.Entry,
        outfile: cfg.Out,
        bundle: true,
        minify: cfg.Minify,
        keepNames: true, 
        banner: { js: '// deno-lint-ignore-file' },
        format: "esm"
    }).catch((e) => console.info(e));
    esBuild.stop();
}
