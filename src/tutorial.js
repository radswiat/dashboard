/*********************************************************
 * Importing / exporting
 * https://www.exratione.com/2015/12/es6-use-of-import-property-from-module-is-not-a-great-plan/
 */
// Import a module without any import bindings, just to
// execute its code without assigning any variables here.
// import 'example';

// Import the default export of a module.
// import exampleDefaultExport from 'example';

// Import a named export of a module.
// import { property } from 'example';

// Import a named export to a different name,
// import { property as exampleProperty } from 'example';

// Import all exports from a module as properties of an object.
// import * as example from 'example';

// Export a named variable.
// export var property = 'example property';

// Export a named function.
// export function property() {};

// Export an entity to the default export.
// export default 'example default';

// Export an existing variable.
// var property = 'example property';
// export { property };

// Export an existing variable as a new name.
// export { property as exampleProperty };

// Export an export from another module.
// export { property as exampleProperty } from 'example';

// Export all exports from another module.
// export * from 'example';





/****************************************
 * Exports
 * **************************************/
// export { double };
// import { double } from 'mymodule';

// export default function(x) { }
// import double from 'mymodule';