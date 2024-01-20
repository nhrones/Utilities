
# Installable Deno Run Utility

A convenience tool for running a deno file.    

### Install
Copy the command below, then paste it in any commandline, and press enter. 
```
deno install -A -f -n run https://raw.githubusercontent.com/nhrones/Utilities/main/Run/mod.ts
```
This will install a command file locally in the .deno folder.  

### Usage
In a project folder, You simply type `run yourFileName` on the commandline.    
This will run the command **_deno run -A --unstable yourFileName.ts_**    
  - if a file name is not provided, **_run_** will add a default **_main.ts_** to the command
  - if not provided, a **.ts** will automatically be applied to a file name
