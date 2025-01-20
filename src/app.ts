import express, { Request, Response } from 'express';
import cors from 'cors';
import { PostgresDataSource } from './config/database.config';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerDocument } from './config/swagger.config';
import 'dotenv/config';
import memberRoute from './routes/member.route';

const app = express();
const port = process.env.SERVER_PORT;

app.use(cors({ origin: true }));
app.use(express.json());

app.use('/members', memberRoute);

const initializeDatabase = async () => {
  try {
    await PostgresDataSource.initialize();
    console.log('✅ Database initialized!');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
};

const setupSwagger = (app: express.Application) => {
  const swaggerSpec = swaggerJSDoc(swaggerDocument) as Record<string, any>;

  app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

  app.get('/swagger.json', (_req: Request, res: Response) => {
    res.json(swaggerSpec);
  });

  console.log('✅ Swagger configured at /swagger');
};

const startServer = async () => {
  await initializeDatabase();
  setupSwagger(app);

  if (!port) {
    console.error('❌ SERVER_PORT not defined in .env file');
    process.exit(1);
  }

  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });
};

startServer();
