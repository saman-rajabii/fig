import { isArray, isDate, isString, upperCase } from "lodash";

let baseQuery: string = null;
let condition: string = null;

export function make(
  table: string /*| string[]*/,
  criterias: any,
  includes: string | string[] = "*"
  // queryType: string = "SELECT"
): string {
  let andCriteria,
    orCriteria,
    andSubCriteria,
    orSubCriteria = null;

  if (!baseQuery)
    baseQuery = `SELECT ${
      isArray(includes) ? includes.join(",") : includes
    } FROM ${table} `;

  if (criterias) {
    andCriteria = criterias.and;
    orCriteria = criterias.or;

    if (!condition) condition = "WHERE ";

    if (andCriteria) {
      condition += "( " + conditionCreator("AND", andCriteria);

      const subBracket = andCriteria.find((i: any) => i.bracket);

      if (subBracket) {
        andSubCriteria = Object.assign(subBracket.bracket, {});

        make(table, andSubCriteria, includes /*, queryType*/) + " ) ";
      }

      condition += " )";
    }

    if (orCriteria) {
      condition +=
        ` ${andCriteria ? upperCase(criterias.op) : ""} ` +
        "( " +
        conditionCreator("OR", orCriteria);

      const subBracket = orCriteria.find((i: any) => i.bracket);

      if (subBracket) {
        orSubCriteria = Object.assign(subBracket.bracket, {});

        make(table, orSubCriteria, includes /*, queryType*/) + " ) ";
      }

      condition += " )";
    }
  }

  return baseQuery + condition;
}

function conditionCreator(op: string, criterias: any[]): string {
  let conditions = "";

  for (let index = 0; index < criterias.length; index++) {
    if (!criterias[index].bracket) {
      const operator = index == criterias.length - 1 ? "" : ` ${op} `;
      conditions += criteriaParser(criterias[index]) + operator;
    }
  }

  return conditions;
}

function criteriaParser(criteria: any): string {
  if (isString(criteria.value) || isDate(criteria.value))
    criteria.value = `"${criteria.value}"`;

  return `${criteria.field} ${criteria.op} ${criteria.value}`;
}
