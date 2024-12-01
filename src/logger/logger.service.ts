import { ConsoleLogger } from '@nestjs/common';
import { createWriteStream } from 'node:fs';

const LOG_LEVEL = process.env.LOG_LEVEL || 'log';

export class LoggerService extends ConsoleLogger {
  ws = createWriteStream(`${Date.now()}-${Math.ceil(Math.random() * 1000)}`);

  log(message: any, stack?: string, context?: string) {
    // add your tailored logic here
    // super.log(message, stack ?? context);
    this.ws.write(`[LOG] ${message}\n`);
  }

  fatal(message: any, stack?: string, context?: string) {
    // add your tailored logic here
    // super.fatal(message, stack ?? context);
    this.ws.write(`[FATAL] ${message}\n`);
  }

  error(message: any, stack?: string, context?: string) {
    // add your tailored logic here
    // super.error(message, stack ?? context);
    this.ws.write(`[ERROR] ${message}\n`);
  }

  warn(message: any, stack?: string, context?: string) {
    // add your tailored logic here
    // super.warn(message, stack ?? context);
    this.ws.write(`[WARN] ${message}\n`);
  }

  debug(message: any, stack?: string, context?: string) {
    // add your tailored logic here
    // super.debug(message, stack ?? context);
    this.ws.write(`[DEBUG] ${message}\n`);
  }

  verbose(message: any, stack?: string, context?: string) {
    // add your tailored logic here
    // super.verbose(message, stack ?? context);
    this.ws.write(`[VERBOSE] ${message}\n`);
  }
}
