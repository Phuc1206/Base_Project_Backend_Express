const result = <T>(callback: () => T): T => {
    return callback();
};

export default result;