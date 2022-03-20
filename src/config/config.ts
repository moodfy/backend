import {databaseConfig, DatabaseConfig} from "./databaseConfig";
import {loggingConfig, LoggingConfig} from "./loggingConfig";
import {serverConfig, ServerConfig} from "./serverConfig";

class Configs {
  private _databaseConfig: DatabaseConfig;
  private _loggingConfig: LoggingConfig;
  private _serverConfig: ServerConfig;

  constructor() {
    this._databaseConfig = databaseConfig;
    this._loggingConfig = loggingConfig;
    this._serverConfig = serverConfig;
  }

  getDatabaseConfig(): DatabaseConfig {
    return this._databaseConfig;
  }

  getLoggingConfig(): LoggingConfig {
    return this._loggingConfig;
  }

  getServerConfig(): ServerConfig {
    return this._serverConfig;
  }
}

export const configs = new Configs();