import validate from "../validate";

const objectId = () => (v: any) => {
    if (!validate.objectId(v)) {
        throw new Error("Invalid ObjectId");
    }

    return true;
};

export default objectId;