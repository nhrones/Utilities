
# Simple Deno Server Example

Used as a dev tool for running static html sites.     

This simple html server will serve an index.html file and any requests that it generates (style.css, app.js, ...).
It will automaticaly launch your default browser with the index.html content.

## Usage
### From Github:
Open any folder in vscode that contains an `index.html` file.     
Then, in the vscode terminal, enter or (copy-paste) the following: 
```
deno run -A --unstable https://raw.githubusercontent.com/nhrones/Utilities/main/Simple/serve.ts
```
Your browser will open and display index.html at `http://localhost:80`

### Installed locally
Install as detailed below, then simply enter `serve` on the commandline.

## commandline options:

Assuming you've installed locally (`see below`) as `serve`, you can use the following args to configure this server. These will be persisted in the project for all future calls to serve.    

### arg[0]
arg[0] = port number or target folder    
Note: if arg[0] is a target folder, port number auto defaults to 80
```ts
// serve from port to 3000
serve 3000
// serve the folder named `dist`
serve dist
```
### arg[1]
This second argument sets either the port number or the folder based on the value of arg[0] -- arg[1] = target folder (if arg[0] is port number)
```ts
// serve the folder named `public` from port 3000
serve 3000 dist
// serve the folder named `public` from port 3000
serve dist 3000

```
Whenever these commandline args are used, the included `./.vscode/dev.json` file will be updated with these values. You can at anytime edit these values manually.    

After initial use, you can simply enter`serve` in the terminal and the values in `dev.json` will be used automatically.   

## Install a local copy
Copy the command below, then paste it in any commandline, and press enter. 
```
deno install -A -f -n serve https://raw.githubusercontent.com/nhrones/Utilities/main/Simple/serve.ts

```
## Install a local copy from a local repo
I prefer installing a local copy.  Clone this repo then install with the command below. This will run much faster without the roundtrip to Github.
```
deno install -A -f -n serve serve.ts
```
After install, you then simply type `serve` on the commandline in your project folder.
An entry named `simple` will be placed in the `./.vscode/dev.json` file.
```json
{
   "simple": {
      "TargetFolder": "",
      "Port": 80
   }
}
```
If your index.html file is in `./dist/`, then you would edit this json file:
```json
{
   "simple": {
      "TargetFolder": "./dist",
      "Port": 80
   }
}
```
You may also manually edit the port number to serve from.

The point of all this is to simply enter `serve` on the commandline to serve your project in the default browser!