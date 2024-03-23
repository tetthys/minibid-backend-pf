import Job from "../../base/Job";
import JobFailedError from "../../error/JobFailedError";

export default class FakeJobThrowError extends Job {
  private id: number;

  constructor(id: number) {
    super("FakeJobThrowError", { id });
    this.id = id;
  }

  public async handle() {
    console.log("called handle method from FakeJobThrowError");

    throw new JobFailedError("test");
  }
}
