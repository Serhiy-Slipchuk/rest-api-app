const middlewarePostPut = require("./middlewarePostPut");
const middlewarePatch = require("./middlewarePatch");
const middlewareUsers = require("./middlewareUsers");
const middlewareAuth = require("./middlewareAuth");
const middlewareUserSubcription = require("./middlewareUserSubscription");
const middlewareUploadUserAvatar = require("./middlewareUploadUserAvatar");

module.exports = {
    middlewarePostPut,
    middlewarePatch,
    middlewareUsers,
    middlewareAuth,
    middlewareUserSubcription,
    middlewareUploadUserAvatar
}