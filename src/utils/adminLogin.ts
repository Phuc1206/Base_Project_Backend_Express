import ENV from "../core/ENV";

const masterLogin = (formData: any): any | false => {
    // if (formData.userName === ENV.MASTER_EMAIL && formData.password === ENV.MASTER_PASSWORD) {
    //     return {
    //         _id: ENV.MASTER_ID,
    //         name: ENV.MASTER_NAME,
    //         email: ENV.MASTER_EMAIL,
    //         phone: ENV.MASTER_PHONE,
    //         address: "Vinhomes",
    //         permission: {
    //             resource: EResource.master,
    //             role: "undefined",
    //         },
    //         certificate:[],
    //         taxCode:""
    //     };
    // }

    return false;
};

export default masterLogin;