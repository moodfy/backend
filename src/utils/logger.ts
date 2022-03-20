import * as cluster from "cluster";
import * as mkdirp from "mkdirp";
import * as path from "path";
import {configs} from "../config/config";
import {transports, Logger, createLogger} from "winston";
import {Request, Response} from "express";

let config = configs.getLoggingConfig();
config.file.filename = `${path.join(config.directory, "../backend/logs")}/${config.file.filename}`;

if (cluster.isMaster) {
  mkdirp.sync(path.join(config.directory, "../backend/logs"));
}

export const logger = createLogger({
  transports: [
    new transports.File(config.file),
    new transports.Console(config.console)
  ],
  exitOnError: false
});

export const skip = (req: Request, res: Response): boolean => {
  return res.statusCode >= 200;
};

export const stream = {
  write: (message: string, encoding: string): void => {
    logger.info(message);
  }
};