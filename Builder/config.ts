import { Config, getConfig } from './deps.ts'

//export const DEBUG = false


//   If Deno.args[0] = -h or ? == 
//   we just show help text and exit.
if (Deno.args[0] === '-h' || Deno.args[0] === '?') {
   console.log(`
Build Help --   
Usage:
Commandline arg0:
-h or ? = this help
else ...
Commandline arg0 = Out: string - default = "dist"
Commandline arg1 = Entry: string[] - default = ["./src/main.ts"]
Commandline arg2 = Minify: boolean - default = false

/src/dev.json - build:
Out: string - the folder to place the bundle in (defaults to 'dist')
Entry: string[] - default = ["./src/main.ts"]
Minify: boolean - true or false (defaults to false)`
   );
   Deno.exit(0)
}

/** 
 * Our default build configuration object
 * Any commandline-args must follow the order of this cfg 
*/
const requiredCfg = {
   "Out": "dist",                /* deno.arg[0] */
   "FileName": "bundle.js",
   "Entry": ["./src/main.ts"],   /* deno.arg[1] */
   "Minify": false               /* deno.arg[2] */
} satisfies Config

/** gets an existing config, or builds one.
 *  @param {string} - the name of the configuration object
 */
const cfg = getConfig("build", Deno.args, requiredCfg)

export const Minify = cfg.Minify || false
export const Name = cfg.FileName || "bundle.js"
export const Entry = cfg.Entry || ["./src/main.ts"]
export const Out = (cfg.Out && cfg.Out.length > 0)
   ? `./${cfg.Out}/${Name}`
   : `./${Name}`
