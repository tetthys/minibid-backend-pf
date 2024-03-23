export default abstract class Job {
  private className: string;
  private args: Record<string, any>;

  constructor(className: string, args: Record<string, any>) {
    this.className = className;
    this.args = args;
  }

  abstract handle(): Promise<void>;
}
