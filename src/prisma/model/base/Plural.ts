import { Prisma, PrismaClient } from "@prisma/client";
import Model from "../general/Model";
import CustomField from "../../field/CustomField";
import { RelationModel, WithColumnType } from "../type/type";
import _ from "lodash";

type ModelNameType = Uncapitalize<Prisma.ModelName>;

type selectClauseType<T extends ModelNameType> = Prisma.Args<
  PrismaClient[T],
  "findMany"
>["select"];
type excludeClauseType<T extends ModelNameType> = Prisma.Args<
  PrismaClient[T],
  "findMany"
>["select"];
type includeClauseType<ICT extends Uncapitalize<RelationModel> = never> =
  ICT extends never
    ? never
    : Prisma.Args<PrismaClient[ICT], "findMany">["include"];
type whereClauseType<T extends ModelNameType> = Prisma.Args<
  PrismaClient[T],
  "findMany"
>["where"];
type orderByClauseType<T extends ModelNameType> = Prisma.Args<
  PrismaClient[T],
  "findMany"
>["orderBy"];
// type distinctClauseType<T extends ModelNameType> = Prisma.Args<
//   PrismaClient[T],
//   "findMany"
// >["distinct"];

export default abstract class Plural<
  T extends ModelNameType,
  WCT extends WithColumnType,
  ICT extends Uncapitalize<RelationModel> = never
> extends Model {
  private selectClause?: selectClauseType<T>;
  private excludeClause?: excludeClauseType<T>;
  private whereClause?: whereClauseType<T>;
  private orderByClause?: orderByClauseType<T>;
  private includeClause?: includeClauseType<ICT>;
  private withColumn: WCT = {} as WCT;
  private _mix: boolean = false;
  private _page: any;
  private _take: any;

  private customFieldArr: Array<CustomField> = [];
  private prismaModel: PrismaClient[T];

  private result: Array<object> = [];

  constructor(prismaModel: PrismaClient[T]) {
    super();
    this.prismaModel = prismaModel;
  }

  public select(selectClause: selectClauseType<T>): this {
    this.selectClause = selectClause;
    return this;
  }

  public exclude(excludeClause: excludeClauseType<T>): this {
    this.excludeClause = excludeClause;
    return this;
  }

  public where(whereClause: whereClauseType<T>): this {
    this.whereClause = whereClause;
    return this;
  }

  public orderBy(orderByClause: orderByClauseType<T>): this {
    this.orderByClause = orderByClause;
    return this;
  }

  public include(includeClause: includeClauseType<ICT>): this {
    this.includeClause = includeClause;
    return this;
  }

  public with(withColumn: WCT): this {
    this.withColumn = { ...this.withColumn, ...withColumn };
    return this;
  }

  public mix(): this {
    this._mix = true;
    return this;
  }

  public page(page: any): this {
    this._page = page ?? 1;
    return this;
  }

  public async get(take?: number) {
    this._take = take;

    let args: object = this.buildArgs();

    this.result = await (this.prismaModel as any).findMany(args);

    await this.applyWithColumnOnThisResult();

    this.applyMixOnThisResult();
    this.applyExcludeOnThisResult();

    return await this.formatThisResult();
  }

  private buildArgs(): object {
    const page = this._page;
    const take = this._take;

    let args: any = {
      take: take,
    };

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

    if (page) {
      args.skip = take * (page - 1);
    }

    return args;
  }

  private async applyWithColumnOnThisResult(): Promise<void> {
    let originalObjectArr: Array<any>;
    originalObjectArr = this.result;

    for (const withColumnProperty in this.withColumn) {
      if (this.withColumn[withColumnProperty]) {
        //
        //
        for (const originalObject of originalObjectArr) {
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
        //
        //
      }
    }

    this.result = originalObjectArr;
  }

  private async paginatedFormat(data: Array<object>) {
    const total = await (this.prismaModel as any).count({
      where: this.whereClause,
    });
    const take = this._take;
    const page = this._page;
    return {
      data: data,
      meta: {
        total: total,
        per_page: take,
        page_count: Math.ceil(total / take), // compatible with react-paginate package
        current_page: page,
      },
    };
  }

  public registerCustomField(customFieldArr: Array<CustomField>) {
    this.customFieldArr = [...this.customFieldArr, ...customFieldArr];
    return this;
  }

  private applyMixOnThisResult(): void {
    if (this._mix) {
      this.result = _.shuffle([...this.result]);
    }
  }

  private applyExcludeOnThisResult(): void {
    if (this.excludeClause) {
      this.result = [...this.result].map((each: any) => {
        for (const key in this.excludeClause) {
          delete each[key];
        }
        return each;
      });
    }
  }

  private async formatThisResult() {
    if (this._page) {
      return await this.paginatedFormat(this.result);
    }
    return this.result;
  }
}
