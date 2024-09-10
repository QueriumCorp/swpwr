const buildInfo = {
    version: process.env.npm_package_version,
    buildDate: new Date().getTime(),
};

console.log(JSON.stringify(buildInfo));