import Queue from "../Queue";

export default class QueueSingleton {
  private static instance: Queue;

  private constructor() {}

  public static getInstance(): Queue {
    if (!QueueSingleton.instance) {
      QueueSingleton.instance = new Queue();
    }
    return QueueSingleton.instance;
  }
}
