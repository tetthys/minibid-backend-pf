import Scheduler from "../Scheduler";

export default class SchedulerSingletone {
  private static instance: Scheduler;

  private constructor() {}

  public static getInstance(): Scheduler {
    if (!SchedulerSingletone.instance) {
      SchedulerSingletone.instance = new Scheduler();
    }
    return SchedulerSingletone.instance;
  }
}
