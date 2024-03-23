import EndAuctionByTime from "../../src/command/commands/EndAuctionByTime";
import Haven from "../../src/tool/Haven/Haven";

describe("scheduler", () => {
  it("run every minute", async () => {
    jest.useFakeTimers();

    const command = new EndAuctionByTime();

    jest.spyOn(command, "execute");

    Haven.Scheduler().command(command).everyMinute();

    const intervalId = setInterval(() => {
      Haven.Scheduler().trigger();
    }, 100);

    jest.advanceTimersByTime(5 * 1000 * 60);

    clearInterval(intervalId);

    expect(command.execute).toBeCalledTimes(5);
  });
  it("run every hour", async () => {
    jest.useFakeTimers();

    const command = new EndAuctionByTime();

    jest.spyOn(command, "execute");

    Haven.Scheduler().command(command).everyHour();

    const intervalId = setInterval(() => {
      Haven.Scheduler().trigger();
    }, 100);

    jest.advanceTimersByTime(5 * 1000 * 60 * 60);

    clearInterval(intervalId);

    expect(command.execute).toBeCalledTimes(5);
  });
  it("run every day", async () => {
    jest.useFakeTimers();

    const command = new EndAuctionByTime();

    jest.spyOn(command, "execute");

    Haven.Scheduler().command(command).everyDay();

    const intervalId = setInterval(() => {
      Haven.Scheduler().trigger();
    }, 100);

    jest.advanceTimersByTime(5 * 1000 * 60 * 60 * 24);

    clearInterval(intervalId);

    expect(command.execute).toBeCalledTimes(5);
  });
});
