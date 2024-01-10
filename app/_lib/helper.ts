"use client";
import { sub, formatISO } from "date-fns";
import { Utils as QbUtils } from "@react-awesome-query-builder/antd";

/**
 * Generates a time range filter for OpenSearch queries
 * @param {number} timeValue - The amount of time for the interval
 * @param {string} timeUnit - The unit of time (minutes, hours, days, weeks, years)
 * @return {object}
 */
export function CreateTimeRangeFilter(timeValue?: number, timeUnit?: string) {
  const now = new Date();
  let fromTime;

  if (!timeValue || !timeUnit) return undefined;


  switch (timeUnit) {
    case "minutes":
      fromTime = sub(now, { minutes: Number(timeValue) });
      break;
    case "hours":
      fromTime = sub(now, { hours: Number(timeValue) });
      break;
    case "days":
      fromTime = sub(now, { days: Number(timeValue) });
      break;
    case "weeks":
      fromTime = sub(now, { weeks: Number(timeValue) });
      break;
    case "years":
      fromTime = sub(now, { years: Number(timeValue) });
      break;
    default:
      throw new Error("Invalid time unit");
  }

  const fromTimeISO = formatISO(fromTime);
  const toTimeISO = formatISO(now);

  return {
    gte: fromTimeISO,
    lte: toTimeISO,
  };
}

/**
 * Parses the query generated by the query builder and combines it with a time interval filter.
 * @param {Config} ruleConfig - The configuration object for the query builder.
 * @param {any} query - The query object generated by the query builder.
 * @param {any} timeInterval - The time interval filter to be applied.
 * @returns An Elasticsearch query object.
 */
export function ParseQuery(ruleConfig?: any, query?: any, timeInterval?: any) {
  if (ruleConfig && query) {
    const tree = QbUtils.checkTree(QbUtils.loadTree(query), ruleConfig);
    var elasticSearchQuery = QbUtils.elasticSearchFormat(
      tree,
      ruleConfig
    ) as any;

    if (timeInterval && elasticSearchQuery?.query?.bool?.must) {
      // Append the time interval filter to the existing must array
      elasticSearchQuery.query.bool.must.push({
        range: {
          sentDate: timeInterval,
        },
      });
    }


    return elasticSearchQuery;
  } else if (timeInterval) {
    // Only time interval filter is available
    var result = {
      query: {
        bool: {
          must: [
            {
              range: {
                sentDate: timeInterval,
              },
            },
          ],
        },
      },
    };
    return {
      ...result.query,
    };
  }

  return {};
}

export function ProcessConditions(content: string): string[] {
  const andConditions: string[] = [];
  const orConditions: string[] = [];

  const conditions = content.split(/ AND | OR /);

  let currentType = "AND";

  conditions.forEach((condition) => {
    if (condition.includes("OR")) {
      const orSplit = condition.split(" OR ");
      if (orSplit[0]) andConditions.push(orSplit[0]);
      orConditions.push(...orSplit.slice(1));
      currentType = "OR";
    } else {
      if (currentType === "AND") {
        andConditions.push(condition);
      } else {
        orConditions.push(condition);
      }
    }
  });

  return [...andConditions, ...orConditions];
}

export function ConvertToMilliseconds(value: number, unit: string): number {
  switch (unit) {
    case 'seconds':
      return value * 1000;
    case 'minutes':
      return value * 60000;
    case 'hours':
      return value * 3600000;
    default:
      throw new Error('Invalid unit. Please use "seconds", "minutes", or "hours".');
  }
}