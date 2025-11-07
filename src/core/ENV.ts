import fs from 'node:fs';
import path from 'node:path';
import logger from './logger';
import make from '../utils/make';

class ENV {
    public static readonly IS_DEV: boolean = process.env.NODE_ENV === 'development';

    public static readonly VERSION: string = make.result(() => {
        const model = ENV.IS_DEV ? 'DEVELOPMENT' : 'PRODUCTION';
        if (ENV.IS_DEV) return model;

        const pathVersionFile = path.join(__dirname, '../../version.txt');

        if (!fs.existsSync(pathVersionFile)) return 'CF15 OFFICE PRODUCTIVE VERSION';

        const strVersion = fs.readFileSync(pathVersionFile).toString();
        return `${model}:${strVersion}`;
    });

    private static getENV(k: string) {
        const v = process.env[k];
        if (v === undefined) {
            logger('ERROR', `ENV missing ${k} property`);
            process.exit();
        }
        return v;
    }

    public static get PORT() {
        const df: number = 80;
        if (!process.env.PORT) {
            return df;
        }

        const p = parseInt(process.env.PORT);

        if (!isFinite(p)) return df;
        return p;
    }

    public static get MONGODB_URI() {
        return this.getENV('MONGODB_URI') as string;
    }

    public static get ACCESS_TOKEN_SECRET() {
        return this.getENV('ACCESS_TOKEN_SECRET') as string;
    }

    public static get REFRESH_TOKEN_SECRET() {
        return this.getENV('REFRESH_TOKEN_SECRET') as string;
    }

    public static get PASSWORD_SECRET_KEY() {
        return this.getENV('PASSWORD_SECRET_KEY') as string;
    }

    public static get ADMIN_ID() {
        return this.getENV('ADMIN_ID') as string;
    }
    public static get ADMIN_USER_NAME() {
        return this.getENV('ADMIN_USER_NAME') as string;
    }
    public static get ADMIN_EMAIL() {
        return this.getENV('ADMIN_EMAIL') as string;
    }

    public static get ADMIN_PASSWORD() {
        return this.getENV('ADMIN_PASSWORD') as string;
    }

    public static get ADMIN_NAME() {
        return this.getENV('ADMIN_NAME') as string;
    }
    public static get ADMIN_FULL_NAME() {
        return this.getENV('ADMIN_FULL_NAME') as string;
    }

    public static get ADMIN_PHONE_NUMBER() {
        return this.getENV('ADMIN_PHONE_NUMBER') as string;
    }

    public static get DEFAULT_PASSWORD() {
        return this.getENV('DEFAULT_PASSWORD') as string;
    }
}

export default ENV;

