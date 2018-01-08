const path = require("path");
const getPath = (pathStr)=>{
    return path.resolve(__dirname, "../src");
};
const paths = {
    "react": getPath("../node_modules/react"),
    "react-dom": getPath("../node_modules/react-dom"),
    "src": getPath(""),
};

module.exports = (str)=>{
    return paths[str]||path["src"];
};