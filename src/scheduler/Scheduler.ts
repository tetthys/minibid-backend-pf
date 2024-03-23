import Command from "../command/base/Command";

export default class Scheduler {
  private commands: Array<{
    command: Command;
    schedule: string;
    lastRun: Date | undefined;
  }> = [];

  public command(command: Command): this {
    this.commands.push({
      command,
      schedule: "everyMinute",
      lastRun: undefined,
    });
    return this;
  }

  public everyMinute() {
    this.commands[this.commands.length - 1].schedule = "everyMinute";
    return this;
  }

  public everyHour() {
    this.commands[this.commands.length - 1].schedule = "everyHour";
    return this;
  }

  public everyDay() {
    this.commands[this.commands.length - 1].schedule = "everyDay";
    return this;
  }

  public trigger() {
    const now = new Date();

    this.commands.forEach((command) => {
      if (command.lastRun === undefined) {
        command.lastRun = now;
        return;
      }

      const shouldRun =
        (command.schedule === "everyMinute" &&
          (!command.lastRun ||
            now.getMinutes() !== command.lastRun.getMinutes())) ||
        (command.schedule === "everyHour" &&
          (!command.lastRun ||
            now.getHours() !== command.lastRun.getHours())) ||
        (command.schedule === "everyDay" &&
          (!command.lastRun || now.getDate() !== command.lastRun.getDate()));

      if (shouldRun) {
        command.command.execute();
        command.lastRun = now;
      }
    });
  }
}
