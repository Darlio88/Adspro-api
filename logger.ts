import fs from 'fs';
import color from 'ansi-colors';

if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
}

export const Logger: any = (exports.Logger = {});

const infoStream = fs.createWriteStream('logs/info.txt');
const errorStream = fs.createWriteStream('logs/error.txt');
const debugStream = fs.createWriteStream('logs/debug.txt');
const warnStream = fs.createWriteStream('logs/warn.txt');

Logger.info = function (message: string) {
    console.log(
        color.green(`[INFO] ${new Date().toLocaleTimeString()} ${message}`)
    );
    infoStream.write(`[INFO] ${new Date().toLocaleTimeString()} ${message}\n`);
};

Logger.error = function (message: string, error?: Error) {
    console.log(
        color.red(`[ERROR] ${new Date().toLocaleTimeString()} ${message}`),
        error
    );
    errorStream.write(
        `[ERROR] ${new Date().toLocaleTimeString()} ${message}\n ${error}\n`
    );
};

Logger.debug = function (message: string) {
    console.log(
        color.gray(`[DEBUG] ${new Date().toLocaleTimeString()} ${message}`)
    );
    debugStream.write(
        `[DEBUG] ${new Date().toLocaleTimeString()} ${message}\n`
    );
};

Logger.warn = function (message: string) {
    console.log(
        color.yellow(`[WARNING] ${new Date().toLocaleTimeString()} ${message}`)
    );
    warnStream.write(
        `[WARNING] ${new Date().toLocaleTimeString()} ${message}\n`
    );
};
