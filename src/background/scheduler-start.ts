import ConsoleLog from "../command/commands/ConsoleLog";
import EndAuctionByTime from "../command/commands/EndAuctionByTime";
import UpdateExchangeRate from "../command/commands/UpdateExchangeRate";
import Haven from "../tool/Haven/Haven";

setInterval(() => {
  Haven.Scheduler().trigger();
}, 1000);

Haven.Scheduler().command(new UpdateExchangeRate()).everyDay();
Haven.Scheduler().command(new EndAuctionByTime()).everyMinute();
Haven.Scheduler().command(new ConsoleLog()).everyMinute();
