import FakeJob from "../../src/job/jobs/fake/FakeJob";
import Serene from "../../src/prisma/factory/Serene";
import Queue from "../../src/queue/Queue";

/**
 * I used await keyword on enqueue, But It's only for testing.
 *
 * I expect client to not wait for enqueue to finish.
 */

describe("queue", () => {
  beforeEach(async () => {
    await Serene.prisma().job.deleteMany();
  });

  it("enqueue : expect correct length", async () => {
    const queue = new Queue();
    await queue.enqueue(new FakeJob(1));
    await queue.enqueue(new FakeJob(2));
    await queue.enqueue(new FakeJob(3));

    const mustBeThree = await queue.length();
    expect(mustBeThree).toBe(3);
  });

  it("enqueue : save job to db", async () => {
    const queue = new Queue();
    await queue.enqueue(new FakeJob(1));
    await queue.enqueue(new FakeJob(2));
    await queue.enqueue(new FakeJob(3));

    const mustBeThree = await Serene.prisma().job.count();
    expect(mustBeThree).toBe(3);
  });

  it("peek : must return the job instance, length is ( enqueued - 0 )", async () => {
    const queue = new Queue();
    await queue.enqueue(new FakeJob(1));
    await queue.enqueue(new FakeJob(2));
    await queue.enqueue(new FakeJob(3));

    const peekedOne = await queue.peek();
    const mustBeThree = await queue.length();

    expect(peekedOne).toEqual(new FakeJob(1));
    expect(mustBeThree).toBe(3);
  });

  it("dequeue : must return the job instance, length is ( enqueued - 1 )", async () => {
    const queue = new Queue();
    await queue.enqueue(new FakeJob(1));
    await queue.enqueue(new FakeJob(2));
    await queue.enqueue(new FakeJob(3));

    const dequeuedOne = await queue.dequeue();
    const mustBeTwo = await queue.length();

    expect(dequeuedOne).toEqual(new FakeJob(1));
    expect(mustBeTwo).toBe(2);
  });

  it("length : return correct length", async () => {
    const queue = new Queue();
    await queue.enqueue(1);
    await queue.enqueue(2);
    await queue.enqueue(3);

    const mustBeThree = await queue.length();

    expect(mustBeThree).toBe(3);
  });

  it("isEmpty", async () => {
    const queue = new Queue();

    const mustBeTrue = await queue.isEmpty();

    expect(mustBeTrue).toBe(true);
  });

  it("isNotEmpty", async () => {
    const queue = new Queue();
    await queue.enqueue(1);
    await queue.enqueue(2);
    await queue.enqueue(3);

    const mustBeTrue = await queue.isNotEmpty();

    expect(mustBeTrue).toBe(true);
  });
});
