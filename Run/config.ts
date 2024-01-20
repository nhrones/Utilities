import { Config, getConfig } from './deps.ts'

export const DEBUG = false
const arg0 = Deno.args[0]

if (arg0) {
   // if args0 = -h or ?, show help then exit
   if (arg0 === '-h' || arg0 === '?') {
      console.log(`
   Simple Server Help --
   Usage:
   commandline args:
   -h or ? = this help

   devTools.json:
   BuildTarget: "",
   Port: 80
   `);
      Deno.exit(0)
   }
}

/**
 * required Cfg
 */
const requiredCfg = {
   "FileName": "mod",
   "Port": 80
} satisfies Config

// gets an existing config, or builds one
const cfg = getConfig('run', Deno.args, requiredCfg)

export const file = cfg.FileName || ""
export const port = cfg.Port || 80
