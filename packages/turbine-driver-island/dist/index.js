"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const publish = async (message) => {
    console.log(`Publishing message: ${JSON.stringify(message, null, 2)}`);
};
const subscribe = async (options) => {
    options.events.forEach((event) => {
        const [type, callback] = event;
        console.log(`Subscribing to message type: "${type}" with "${callback.toString().slice(0, 100)}..."`);
    });
};
const createDriver = () => {
    return {
        publish,
        subscribe,
    };
};
exports.default = createDriver;
//# sourceMappingURL=index.js.map