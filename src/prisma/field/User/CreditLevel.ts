import CustomField from "../CustomField";

export default class CreditLevel extends CustomField {
  public async get(userId: number) {
    const rawQueryResult: Array<any> = [
      {
        creditLevel: "good",
      },
    ];
    return rawQueryResult[0];
  }

  public getType(): string {
    return "creditLevel";
  }
}
