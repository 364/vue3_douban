const files = require.context("@/components", true, /\.vue$/);
const modules = {};

const rDashAlpha: RegExp = /-([a-z]|[0-9])/gi;
const rmsPrefix: RegExp = /^-ms-/;
const fCamelCase = (all: string, letter: string): string => {
  return (letter + "").toUpperCase();
};
const camelCase = (string: string): string => {
  let str = string
    .replace(rmsPrefix, "ms-")
    .replace(rDashAlpha, fCamelCase)
    .replace("/index", "");
  return str.slice(0, 1).toLowerCase() + str.slice(1);
};

for (const key of files.keys()) {
  const filename = key.replace(/^\.\/(.*)\.\w+$/, "$1");
  if (filename.indexOf("/") > 0 && !/^\w+\/index$/g.test(filename)) continue;
  modules[camelCase(filename)] = files(key).default;
}

console.log("components", modules);
export default modules;
