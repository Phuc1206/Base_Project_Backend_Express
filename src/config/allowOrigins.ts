export interface TAllowOrigins {
    protocol: ('http' | 'https')[];
    domain: string;
    ports: number[];
}

const allowOrigins: TAllowOrigins[] = [
    {
        protocol: ['http', 'https'],
        domain: '127.0.0.1',
        ports: [3000],
    },
    {
        protocol: ['http', 'https'],
        domain: 'localhost',
        ports: [3000],
    },
    {
        protocol: ['http', 'https'],
        domain: 'office.congtycaphe15.com',
        ports: [80, 443],
    },
    {
        protocol: ['http', 'https'],
        domain: 'cf15office.checkee.vn',
        ports: [80, 443]
    }
];

export default allowOrigins;