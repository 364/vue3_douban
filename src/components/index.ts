const rDashAlpha: RegExp = /-([a-z]|[0-9])/gi;
const rmsPrefix: RegExp = /^-ms-/;
const fCamelCase = (all: string, letter: string): string => {
  return (letter + "").toUpperCase();
};
const camelCase = (string: string): string => {
  let str = string.replace(rmsPrefix, "ms-").replace(rDashAlpha, fCamelCase);
  return str.slice(0, 1).toLowerCase() + str.slice(1);
};

const files = require.context("@/components", true, /\.vue$/);
const modules = {};

for (const key of files.keys()) {
  const filename = key.replace(/^\.\/(.*)\.\w+$/, "$1");
  modules[camelCase(filename)] = files(key).default;
}

console.log("components", modules);
export default modules;
