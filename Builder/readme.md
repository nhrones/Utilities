# esbuild utility
This small utility will build your TS code and bundle it to a    
JS file to use in an html file.    
On first use in a project folder, this utility installs a    
configuration in _./.vscode/dev.json_: 
```json
{
   "build": {
      "BundleName": "bundle.js",
      "Entry": [
         "./src/main.ts"
      ],
      "Minify": false,
      "Out": "dist"
   }
}
```
The above default configuration tells esBuild to    
transpile and bundle all code starting from _./src/main.ts_,    
and place it in _./dist/bundle.js_.    
It also instructs esBuild to not minify the bundle.

Use this config to modify the parameters for a build.    

## Install
You can install this utility locally using: 
```
deno install -n build -A https://raw.githubusercontent.com/nhrones/Utilities/main/Builder/mod.ts 
```
Once installed, just enter **_build_**, from the root of a project.
With the above configuration, you should see a new _bundle.js_ in the ./dist/ folder. 
