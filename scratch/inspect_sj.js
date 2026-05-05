import * as sj from "../node_modules/@mercuryworkshop/scramjet/dist/scramjet.mjs";
console.log(Object.keys(sj));
if (sj.ScramjetController) {
    console.log("ScramjetController:", Object.getOwnPropertyNames(sj.ScramjetController.prototype));
}
if (sj.ScramjetServiceWorker) {
    console.log("ScramjetServiceWorker:", Object.getOwnPropertyNames(sj.ScramjetServiceWorker.prototype));
}
if (sj.ScramjetFetchHandler) {
    console.log("ScramjetFetchHandler:", Object.getOwnPropertyNames(sj.ScramjetFetchHandler.prototype));
}
