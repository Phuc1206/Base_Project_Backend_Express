import makeResult from "./result"
import makeSchema from "./schema"
import makeAddress from "./address"
import makeObjectId from "./objectId"
import makeStrObjectId from "./stringObjectId"

const make = {
    result: makeResult,
    schema: makeSchema,
    address: makeAddress,
    objectId: makeObjectId,
    strObjectId: makeStrObjectId,
};

export default make as Readonly<typeof make>