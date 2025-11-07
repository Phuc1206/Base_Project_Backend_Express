import Crypto from "node:crypto";
import ENV from "../core/ENV";

const hashPassword = (password: string) => {
    return Crypto.createHash("sha256")
        .update(`${ENV.PASSWORD_SECRET_KEY}_${password}_${ENV.PASSWORD_SECRET_KEY}`)
        .digest("hex");
};

export default hashPassword;