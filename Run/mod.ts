
//import { join } from "./deps.ts";
import * as cfg from './config.ts'

// const run = async (file: string) => {
//    console.log(`Run - ${file} - started!`)

//    const p = Deno.run({
//          cmd: [
//            "deno",
//            "run",
//            "--allow-all",
//            "--unstable",
//            file
//          ]
//        });

//    await p.status()
//       .then(() => console.log())
//       .catch((reason) => console.warn(reason));
// }

const run = (file: string) => {
  console.log(`Run - ${file} - started!`)

  const _p = new Deno.Command( "deno",
    {
      args: [
        "run",
        "--allow-all",
        "--unstable",
        file
      ]
    }
  );
}

run(`./${cfg.file}.ts`)
