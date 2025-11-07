import logger from "../../core/logger";
import TVariableType from "../../core/types/TVariableType";

const validateObject = (objectParam: any) => {
    let isObject: boolean = true;

    if (typeof objectParam !== "object") {
        // logger("ERROR", "is not a object");
        isObject = false;
    }

    // logger("INFO", "1")

    const objectParamKeys = Object.keys(objectParam);

    return Object.freeze({
        hasKeys: (keys: string[], absolute: boolean = false) => {
            if (!isObject) return false;

            if (absolute) {
                if (keys.length !== objectParamKeys.length) {
                    return false;
                }
            }

            for (const k of keys) {
                if (!objectParamKeys.includes(k)) {
                    return false;
                }
            }

            return true;
        },

        hasStruct: (structs: [string, TVariableType][], absolute: boolean = false) => {
            // logger("INFO", "2")
            if (!isObject) return false;

            if (absolute) {
                if (structs.length !== objectParamKeys.length) {
                    logger("ERROR", "! length");
                    return false;
                }
            }

            // logger("INFO", "3")

            for (const [structKey, structType] of structs) {
                if (typeof objectParam[structKey] !== structType) {
                    logger("ERROR", "! types");
                    return false;
                }
            }

            // logger("INFO", "4")

            return true;
        },
    });
};

export default validateObject;