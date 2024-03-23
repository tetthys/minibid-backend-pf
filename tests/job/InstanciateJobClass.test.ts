import CreateUserCheckout from "../../src/job/jobs/CreateUserCheckout";
import InstanciateJobClass from "../../src/job/InstanciateJobClass";
import Serene from "../../src/prisma/factory/Serene";

describe("InstanciateJobClass", () => {
  const userId = 1;
  const productId = 1;

  it("check serialize is possible", async () => {
    const serialized = JSON.stringify(
      new CreateUserCheckout(userId, productId)
    );

    const deserialized = JSON.parse(serialized);
    const job = InstanciateJobClass.instanciate(deserialized);
    expect(job instanceof CreateUserCheckout).toBe(true);
  });

  it("store serialized into database", async () => {
    const serialized = JSON.stringify(
      new CreateUserCheckout(userId, productId)
    );

    const serializedRecord = await Serene.prisma().job.create({
      data: {
        payload: serialized,
      },
    });

    const deserialized = JSON.parse(serializedRecord.payload);

    const job = InstanciateJobClass.instanciate(deserialized);
    expect(job instanceof CreateUserCheckout).toBe(true);
  });
});
