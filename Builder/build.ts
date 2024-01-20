
/**
 * grab the builder function 
 */
import { buildIt } from './buildIt.ts'

/** 
 * this import auto-builds and fetches a configuaration 
 */
import * as cfg from './config.ts'


// Note that this uses the config lib that builds or
// reads a configuration from cli args and/or from
// the `/.vscode/dev.json` -> build object
buildIt(cfg)