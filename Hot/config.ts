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

// requested initial default configuration
const requiredCfg = {
   "Out": "./dist",     // the folder to place esBuild bundle.js in 
   "Serve": "./",       // the folder to serve index.html from 
   "Port": 8080,
   "Entry": ["./src/main.ts"] ,  // an array of entry files to start esBuild from
   "Watch": ["src", "dist"],     // Array of folders to watch for changes in.
   "Minify": false               // minify the esbuild bundle?
} satisfies Config


// gets an existing config, or builds one
const cfg = getConfig("hot", Deno.args, requiredCfg)
//server takes just ServeFolder and WatchFolders
export const ServeFolder = cfg.Serve ?? ""
export const Port = cfg.Port ?? 80
export const Watch = cfg.Watch ?? ["src", "dist"]
export const MINIFY = cfg.Minify ?? false
export const ENTRY = cfg.Entry ?? ['./src/main.ts']
export const OUT = (cfg.Out && cfg.Out.length > 0) ? `./${cfg.Out}/bundle.js` : './bundle.js'
