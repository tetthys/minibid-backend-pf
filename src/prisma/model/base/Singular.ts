import { Prisma, PrismaClient } from "@prisma/client";
import CustomField from "../../field/CustomField";
import Model from "../general/Model";
import { WithColumnType, RelationModel } from "../type/type";

type ModelNameType = Uncapitalize<Prisma.ModelName>;

type selectClauseType<T extends ModelNameType> = Prisma.Args<
  PrismaClient[T],
  "findFirst"
>["select"];
type excludeClauseType<T extends ModelNameType> = Prisma.Args<
  PrismaClient[T],
  "findFirst"
>["select"];
type includeClauseType<ICT extends Uncapitalize<RelationModel> = never> =
  ICT extends never
    ? never
    : Prisma.Args<PrismaClient[ICT], "findFirst">["include"];
type whereClauseType<T extends ModelNameType> = Prisma.Args<
  PrismaClient[T],
  "findFirst"
>["where"];
type orderByClauseType<T extends ModelNameType> = Prisma.Args<
  PrismaClient[T],
  "findFirst"
>["orderBy"];
// type distinctClauseType<T extends ModelNameType> = Prisma.Args<
//   PrismaClient[T],
//   "findFirst"
// >["distinct"];

export default abstract class Singular<
  T extends ModelNameType,
  WCT extends WithColumnType,
  ICT extends Uncapitalize<RelationModel> = never
> extends Model {
  private selectClause?: selectClauseType<T>;
  private excludeClause?: excludeClauseType<T>;
  private whereClause?: whereClauseType<T>;
  private orderByClause?: orderByClauseType<T>;
  private includeClause?: includeClauseType<ICT>;

  private result: any = {};
  private withColumn: WCT = {} as WCT;
  private customFieldArr: Array<CustomField> = [];
  private model: PrismaClient[T];

  constructor(model: PrismaClient[T]) {
    super();
    this.model = model;
  }

  public select(selectClause: selectClauseType<T>) {
    this.selectClause = selectClause;
    return this;
  }

  public exclude(excludeClause: excludeClauseType<T>) {
    this.excludeClause = excludeClause;
    return this;
  }

  public where(whereClause: whereClauseType<T>) {
    this.whereClause = whereClause;
    return this;
  }

  public orderBy(orderByClause: orderByClauseType<T>) {
    this.orderByClause = orderByClause;
    return this;
  }

  public include(includeClause: includeClauseType<ICT>) {
    this.includeClause = includeClause;
    return this;
  }

  public with(withColumn: WCT) {
    this.withColumn = { ...this.withColumn, ...withColumn };
    return this;
  }

  public async getById(id: number | bigint | string) {
    return await (this.model as any).findFirst({
      where: {
        id: BigInt(id),
      },
    });
  }

  public async get() {
    let args: object = this.buildArgs();

    this.result = await (this.model as any).findFirst(args);

    await this.applyWithColumnOnThisResult();

    this.applyExcludeOnThisResult();

    return this.result;
  }

  private buildArgs(): object {
    let args: any = {};

    if (this.selectClause) {
      args.select = this.selectClause;
    }
    if (this.whereClause) {
      args.where = this.whereClause;
    }
    if (this.orderByClause) {
      args.orderBy = this.orderByClause;
    }
    if (this.includeClause) {
      if (this.selectClause) {
        args.select = { ...args.select, ...this.includeClause };
      } else {
        args.include = this.includeClause;
      }
    }

    return args;
  }

  private async applyWithColumnOnThisResult(): Promise<void> {
    let originalObject: any;
    originalObject = this.result;

    for (const withColumnProperty in this.withColumn) {
      if (this.withColumn[withColumnProperty]) {
        //
        //
        for (const customField of this.customFieldArr) {
          if (customField.getType() === withColumnProperty) {
            //
            //
            const customFieldResultObject = await customField.get(
              originalObject.id
            );
            Object.assign(originalObject, customFieldResultObject);
            //
            //
          }
        }
        //
        //
      }
    }

    this.result = originalObject;
  }

  private applyExcludeOnThisResult(): void {
    if (this.excludeClause) {
      for (const key in this.excludeClause) {
        delete this.result[key];
      }
    }
  }

  public registerCustomField(customFieldArr: Array<CustomField>) {
    this.customFieldArr = [...this.customFieldArr, ...customFieldArr];
    return this;
  }
}
