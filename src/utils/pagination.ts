interface Limit {
    [k: string]: number;
}

const LIMIT: Limit = {
    "10": 10,
    "20": 20,
    "30": 30,
    "50": 50,
}

type Pagination = (nPerPage: any, pageNumber: any) => {skip: number, limit: number};

const pagination: Pagination = (nPerPage, pageNumber) => {
    let limit = 10;
    let page = 1;

    if (typeof nPerPage === "string") {
        limit = LIMIT[nPerPage] || 10;
    }

    if (typeof pageNumber === "string") {
        page = Math.abs(parseInt(pageNumber));
    }

    const skip = page > 0 ? ((page - 1) * limit) : 0;

    return {skip, limit};
}

export default pagination;