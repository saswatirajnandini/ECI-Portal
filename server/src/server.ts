import app from './app';
import { config } from './config';
import logger from './services/logger.service';

app.listen(config.port, () => {
  logger.info(`Server is running on port ${config.port} in ${config.nodeEnv} mode`);
});
