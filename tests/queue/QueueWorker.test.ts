import FakeJob from "../../src/job/jobs/fake/FakeJob";
import FakeJobThrowError from "../../src/job/jobs/fake/FakeJobThrowError";
import Serene from "../../src/prisma/factory/Serene";
import QueueWorker from "../../src/queue/QueueWorker";
import Haven from "../../src/tool/Haven/Haven";

describe("QueueWorker", () => {
  beforeEach(async () => {
    await Serene.prisma().job.deleteMany({});
  });

  it("handle enqueued job", async () => {
    const before = await Haven.Queue().length();

    await Haven.Queue().enqueue(new FakeJob(1));
    await new QueueWorker().startForTest();

    const after = await Haven.Queue().length();

    expect(before).toBe(0);
    expect(after).toBe(0);
  });

  /**
   * I will ignore failed job or other thing. It's a really simple queue
   */
  it("if job throw Error, just dequeue", async () => {
    const before = await Haven.Queue().length();

    await Haven.Queue().enqueue(new FakeJobThrowError(1));
    await new QueueWorker().startForTest();

    const after = await Haven.Queue().length();

    expect(before).toBe(0);
    expect(after).toBe(0);
  });
});
