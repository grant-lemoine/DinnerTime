var str = "        !stats        GrantLemons";
var s = require("underscore.string");

str = s.clean( str.trim() );
console.log(str);
return;
var username = s.clean(str).substr( ( s + 1 ), str.length );

console.log(username);
