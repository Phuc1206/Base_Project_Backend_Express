import validateObject from "./validateObject"
import validateObjectId from "./validateObjectId"
import validatePhoneNumber from "./validatePhoneNumber"
import validateStringObjectId from "./validateStringObjectId"

const validate = Object.freeze({
    object: validateObject,
    objectId: validateObjectId,
    phoneNumber: validatePhoneNumber,
    stringObjectId: validateStringObjectId,
});

export default validate