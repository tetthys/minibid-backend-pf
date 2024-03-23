import delay from "../helper/delay/delay";
import Haven from "../tool/Haven/Haven";

export default class QueueWorker {
  public async start() {
    console.log("QueueWorker started!");
    while (true) {
      // infinite loop
      await this.processQueue();
    }
  }

  public async startForTest() {
    let i = 0;
    while (i++ < 10) {
      // loop for 10 times
      await this.processQueue();
    }
  }

  private async processQueue() {
    await delay(100);
    //
    //
    while (await Haven.Queue().isNotEmpty()) {
      //
      //
      await delay(1000);
      //
      //
      try {
        const peekedOne = await Haven.Queue().peek();
        await peekedOne.handle();
        await Haven.Queue().dequeue();
      } catch (e) {
        await Haven.Queue().dequeue();
      }
      //
      //
    }
    //
    //
  }
}
