import { Buffer } from "node:buffer";

const base64 = (value: string) => {
    return Buffer.from(value).toString("base64");
};

export default base64;