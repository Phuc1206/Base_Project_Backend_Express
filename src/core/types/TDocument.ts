import mongoose from "mongoose";

type TDocument<T> = mongoose.Document<unknown, any, T> &
    T &
    Required<{
        _id: mongoose.Types.ObjectId;
    }>;

export default TDocument;