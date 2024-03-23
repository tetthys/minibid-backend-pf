import pino from "pino";

export default class Log {
  private logger = pino(
    {
      levelComparison: "DESC",
      customLevels: {
        emergency: 70,
        alert: 60,
        critical: 50,
        error: 40,
        warning: 30,
        notice: 20,
        info: 10,
        debug: 0,
      },
      formatters: {
        level(label, number) {
          return { level: label };
        },
      },
      timestamp: pino.stdTimeFunctions.isoTime,
    },
    pino.destination("./logs/app.log") // relative path from root
  );

  public emergency(message: any) {
    this.logger.emergency(message);
  }
  public alert(message: any) {
    this.logger.alert(message);
  }
  public critical(message: any) {
    this.logger.critical(message);
  }
  public error(message: any) {
    this.logger.error(message);
  }
  public warning(message: any) {
    this.logger.warning(message);
  }
  public notice(message: any) {
    this.logger.notice(message);
  }
  public info(message: any) {
    this.logger.info(message);
  }
  public debug(message: any) {
    this.logger.debug(message);
  }
}
