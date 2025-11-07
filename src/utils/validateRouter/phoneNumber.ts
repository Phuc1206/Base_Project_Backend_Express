const PHONE_NUMBER_REGEX = /^\d{10}$/i;

const phoneNumber = (v: any) => {
    if (typeof v !== "string" || !PHONE_NUMBER_REGEX.test(v)) {
        throw new Error(`"${v}" is not a phone number`);
    }

    return true;
};

export default phoneNumber;