import json from "../helper/json/json";
import InstanciateJobClass from "../job/InstanciateJobClass";
import Serene from "../prisma/factory/Serene";

export default class Queue {
  public async enqueue(element: any) {
    await Serene.prisma().job.create({
      data: { payload: json(element) },
    });
  }

  public async dequeue() {
    const peekedOne = await Serene.prisma().job.findFirstOrThrow({});
    const jobInstance = InstanciateJobClass.instanciate(
      JSON.parse(peekedOne.payload)
    );

    await Serene.prisma().job.delete({ where: { id: peekedOne.id } });

    return jobInstance;
  }

  public async peek() {
    const peekedOne = await Serene.prisma().job.findFirstOrThrow({});
    const jobInstance = InstanciateJobClass.instanciate(
      JSON.parse(peekedOne.payload)
    );
    return jobInstance;
  }

  public async isEmpty() {
    return (await Serene.prisma().job.count()) === 0;
  }

  public async isNotEmpty() {
    return (await Serene.prisma().job.count()) !== 0;
  }

  public async length() {
    return await Serene.prisma().job.count();
  }
}
