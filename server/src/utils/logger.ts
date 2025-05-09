import fs from 'fs';
import path from 'path';
const logFilePath = path.join(__dirname, '..', 'logs', 'basic.log');
// Ensure the logs folder exists
if (!fs.existsSync(path.dirname(logFilePath))) {
  fs.mkdirSync(path.dirname(logFilePath));
}
export const log = (message: string) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Failed to write log:', err);
    }
  });
};
