import { Config, getConfig } from './deps.ts'

export const DEV = false

// If the first CLI argument (args[0]) = -h or ?
// show help text then just exit
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

// initial default configuration for this app
const requiredCfg = {
   "Out": "./dist",              // the folder to place esBuild bundle.js in 
   "Serve": "./",                // the folder to serve index.html from 
   "Port": 80,                   // the local port to serve from
   "Entry": ["./src/main.ts"] ,  // an array of entry files to start esBuild from
   "Watch": ["src", "dist"],     // Array of folders to watch for changes in.
   "Minify": false               // minify the esbuild bundle?
} satisfies Config


// gets an existing configuration from ./.vscode/dev.json
// if not found, just build it from requiredCfg above
const cfg = getConfig("hot", Deno.args, requiredCfg)

// export all configuration constants
export const ServeFrom = cfg.Serve ?? ""
export const Port = cfg.Port ?? 80
export const Watch = cfg.Watch ?? ["src", "dist"]
export const Minify = cfg.Minify ?? false
export const Entry = cfg.Entry ?? ['./src/main.ts']
export const Out = (cfg.Out && cfg.Out.length > 0) ? `./${cfg.Out}/bundle.js` : './bundle.js'
