import { global } from "../utilities/globals/index.js";
import { ApolloErrorMessageHandler } from "../utilities/globals/invariantWrappers.js";
export function loadErrorMessageHandler() {
    var errorCodes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        errorCodes[_i] = arguments[_i];
    }
    if (!global[ApolloErrorMessageHandler]) {
        global[ApolloErrorMessageHandler] = handler;
    }
    for (var _a = 0, errorCodes_1 = errorCodes; _a < errorCodes_1.length; _a++) {
        var codes = errorCodes_1[_a];
        Object.assign(global[ApolloErrorMessageHandler], codes);
    }
    return global[ApolloErrorMessageHandler];
    function handler(message, args) {
        if (typeof message === "number") {
            var definition = global[ApolloErrorMessageHandler][message];
            if (!message || !(definition === null || definition === void 0 ? void 0 : definition.message))
                return;
            message = definition.message;
        }
        return args.reduce(function (msg, arg) { return msg.replace(/%[sdfo]/, String(arg)); }, String(message));
    }
}
//# sourceMappingURL=loadErrorMessageHandler.js.map