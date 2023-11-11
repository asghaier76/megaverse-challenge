// logger.ts
export class Logger {
    private static color(code: string, message: string): string {
        return `\x1b[${code}m${message}\x1b[0m`;
    }

    static info(message: string): void {
        const infoMessageColored = Logger.color('32', `[INFO]: ${new Date().toISOString()} - ${message}`);
        console.info(infoMessageColored);
    }

    static error(message: string, error?: Error): void {
        const errorMessageColored = Logger.color('31', `[ERROR]: ${new Date().toISOString()} - ${message}`);
        console.error(errorMessageColored, error);
    }

    static debug(message: string): void {
        const debugMessageColored = Logger.color('33', `[DEBUG]: ${new Date().toISOString()} - ${message}`);
        console.debug(debugMessageColored);
    }
}