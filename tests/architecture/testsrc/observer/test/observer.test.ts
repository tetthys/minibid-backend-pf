import AppleMonitor from "../concrete/AppleMonitor";
import LGMonitor from "../concrete/LGMonitor";
import SamsungMonitor from "../concrete/SamsungMonitor";
import Weather from "../concrete/Weather";

describe("observer", () => {
  it("work", async () => {
    const d1 = new SamsungMonitor();
    const d2 = new AppleMonitor();
    const d3 = new LGMonitor();

    const w = new Weather();

    w.register(d1);
    w.register(d2);
    w.register(d3);

    w.measurementsChanged();

    w.remove(d1);

    w.measurementsChanged();

    expect(d1.getUpdateCount()).toBe(1);
    expect(d2.getUpdateCount()).toBe(2);
    expect(d3.getUpdateCount()).toBe(2);
  });
});
