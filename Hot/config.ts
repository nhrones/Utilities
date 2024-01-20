import { Config, getConfig } from './deps.ts'

export const DEBUG = false

// if args0 = -h or ?, show help then exit
if (Deno.args[0] === '-h' || Deno.args[0] === '?') {
   console.log(`
Build Help --   
Usage:
Commandline args:
-h or ? = this help

/src/dev.json - build:
Out: string - the folder to place the bundle in (defaults to 'dist')
Entry: string[] - default = ["./src/main.ts"]
Watch: string - the folder to watch for change
Minify: boolean - true or false (defaults to false)`
   );
   Deno.exit(0)
}

/* type Config
 *
 * FileName?: string       // the name of a file to run 
 * TargetFolder?: string   // the folder to run from 
 * ServeFolder?: string    // the folder to serve index.html from 
 * BuildTarget?: string    // the folder to place the build bundle in 
 * Watch?: string[]        // Array of folders to watch for changes in. (to trigger a build) 
 * Port?: number           // a port number for the server or a service to use
 * HotPort?: number        // the SSE port number for HotServer to use 
 * CWD?: string            // current working directory 
 * Out?: string            // the folder to place esBuild bundle.js in 
 * Entry?: string[]        // an array of entry files to start esBuild from 
 * Minify?: boolean        // minify the esbuild bundle? 
*/

// requested initial default configuration
const requiredCfg = {
   "TargetFolder": "./dist",
   "ServeFolder": "./",
   "Port": 8080,
   "HotPort": 9099,
   "BuildTarget": "./dist",
   "Entry": ["./src/main.ts"] ,
   "Watch": ["src"],
   "Minify": false
} satisfies Config


// gets an existing config, or builds one
const cfg = getConfig("hot", Deno.args, requiredCfg)

export const TargetFolder = cfg.TargetFolder || "./dist"
export const ServeFolder = cfg.ServeFolder || ""
export const Port = cfg.Port || 80
export const HotPort = cfg.HotPort || 9099
export const BuildTarget = cfg.BuildTarget || "./src/main.ts"
export const WatchFolders = cfg.Watch?? ["src"]
export const MINIFY = cfg.Minify || false
export const ENTRY = (WatchFolders[0] === "") ? ["./main.ts"]: [`./${WatchFolders[0]}/main.ts`]
export const OUT = (cfg.TargetFolder && cfg.TargetFolder.length > 0) ? `./${cfg.TargetFolder}/bundle.js` : './bundle.js'
