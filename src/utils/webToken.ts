import jwt from "jsonwebtoken"

const webTokenVerify = <T>(token: string, secretKey: string): Promise<T> => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(String(token), String(secretKey), (err, payload) => {
                if (err) {
                    reject("Invalid token");
                    return;
                }

                resolve(payload as T);
                return;
            });
        } catch (e) {
            reject("Invalid token");
            return;
        }
    });
};

const webToken = {
    verify: webTokenVerify,
};

export default webToken;