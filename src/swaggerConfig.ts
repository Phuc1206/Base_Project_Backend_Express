import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Tài liệu API tự động tạo bằng Swagger',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./routers/*.js', './routers/*.ts'], // nơi chứa API của bạn
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
