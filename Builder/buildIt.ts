// deno-lint-ignore-file no-explicit-any
import { Config } from './deps.ts'
import { esbuild, denoPlugin } from './deps.ts'

/** 
 * builds and bundles an entrypoint into a single ESM output. 
 * @param {Config} cfg - the configuration to build from, object that contains:        
 *    - Out: string - the folder to place the bundle in (defaults to 'dist')   
 *    - Entry: string[] - the entry points to build from (defaults to ["./src/main.ts"])   
 *    - Minify: boolean - whether or not to minify the bundle
 */ 
export async function buildIt(cfg: Config) {
   console.log(`Bundling ${cfg.Entry} to ${cfg.Out} - minified = ${cfg.Minify}`)    
    await esbuild.build({
        plugins: [denoPlugin({})],
        entryPoints: cfg.Entry,
        outfile: cfg.Out,
        bundle: true,
        minify: cfg.Minify,
        keepNames: true, 
        banner: { js: '// deno-lint-ignore-file' },
        format: "esm"
    }).catch((e: any) => console.info(e));
    esbuild.stop();
}
