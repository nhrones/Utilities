

/**
 * Description placeholder
 * @date 2/24/2024 - 7:51:07 PM
 *
 * @type {HTMLPreElement}
 */
let logger

/**
 * console.log UI proxy
 * @export
 * @callback Log
 * @param {...any} _args
 */
export function log(_args) {
   if (!logger) init()
   for (let i = 0; i < arguments.length; i++) {
     if (typeof arguments[i] == 'object') {
      logger.textContent += (JSON && JSON.stringify 
         ? JSON.stringify(arguments[i], undefined, 2) 
         : arguments[i]) + '\n';
     } else {
      logger.textContent += arguments[i] + '\n';
     }
   }
 }


/** initialize the logger */
function init() {
   logger = document.createElement('pre')
   setStyles()
   document.body.appendChild(logger);
}

/** set logger styles */
function setStyles() {
   logger.style.padding = "20px"
   logger.style.backgroundColor = "black" 
   logger.style.border = "2px solid red"
   logger.style.color = "white" 
   logger.style.fontFamily = "Consolas, 'Courier New', monospace"
   logger.style.fontSize = "1.1rem";
   logger.style.height = "300px"
   logger.style.overflow = "auto"
}