import express from 'express';
import cors from 'cors';
import { PostgresDataSource } from './config/database.config';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './config/swagger.config';
import 'dotenv/config';

const app = express();
const port = process.env.SERVER_PORT

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

PostgresDataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
