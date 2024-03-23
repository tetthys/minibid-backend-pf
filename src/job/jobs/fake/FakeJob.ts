import Job from "../../base/Job";

export default class FakeJob extends Job {
  private id: number;

  constructor(id: number) {
    super("FakeJob", { id });
    this.id = id;
  }

  public async handle() {
    console.log("called handle method from FakeJob");
  }
}
