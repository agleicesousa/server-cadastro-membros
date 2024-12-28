import swaggerJSDoc from 'swagger-jsdoc';
import 'dotenv/config';

const port = process.env.SERVER_PORT

export const swaggerDocument: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Igreja API',
      description: 'Documentação da API do projeto Cadastrar Membros',
      version: '1.0.0'
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Servidor Local'
      }
    ],
    externalDocs: {
      description: 'Swagger JSON',
      url: '../swagger.json'
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        BearerAuth: []
      }
    ]
  },
  apis: ['src/routes/*.ts', 'routes/*.js']
};
