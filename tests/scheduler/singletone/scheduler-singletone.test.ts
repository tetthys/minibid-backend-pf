import SchedulerSingletone from "../../../src/scheduler/singletone/SchedulerSingletone";
import Haven from "../../../src/tool/Haven/Haven";

describe("scheduler singletone", () => {
  it("equality", async () => {
    const scheduler1 = SchedulerSingletone.getInstance();
    const scheduler2 = SchedulerSingletone.getInstance();
    expect(scheduler1).toBe(scheduler2);
  });
  it("equality by Haven", async () => {
    const scheduler1 = Haven.Scheduler();
    const scheduler2 = Haven.Scheduler();
    expect(scheduler1).toBe(scheduler2);
  });
});
