import QueueSingleton from "../../../src/queue/singletone/QueueSingleton";
import Haven from "../../../src/tool/Haven/Haven";

describe("QueueSingleton", () => {
  it("equality test", async () => {
    const queue1 = QueueSingleton.getInstance();
    const queue2 = QueueSingleton.getInstance();
    expect(queue1).toBe(queue2);
  });
  it("through Haven", async () => {
    const queue1 = Haven.Queue();
    const queue2 = Haven.Queue();
    expect(queue1).toBe(queue2);
  });
});
