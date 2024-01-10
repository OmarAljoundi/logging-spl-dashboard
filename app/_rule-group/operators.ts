import { AntdConfig, Operators } from "@react-awesome-query-builder/antd";

export const operators: Operators = {
    ...AntdConfig.operators,
    like: {
        ...AntdConfig.operators.like,
        label: "Contains",
        elasticSearchQueryType: "wildcard",
    },
};