const phoneNumberRegex = /^\d{10}$/i;

const validatePhoneNumber = (v: string) => {
    if(v.length == 0){
        return true;
    }
    return phoneNumberRegex.test(String(v));
};

export default validatePhoneNumber;