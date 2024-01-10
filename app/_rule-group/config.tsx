import { AntdConfig, type Config } from "@react-awesome-query-builder/antd";
import { operators } from "./operators";
import { widgets } from "./widgets";
import { Grip, Plus } from "lucide-react";
import { FieldSelector } from "../_components/custom-renders/field-selector";
import { Button } from "../_components/ui/button";

export const configuration = (data: any): Config => {
  return {
    ...AntdConfig,
    operators: operators,
    widgets: widgets,
    settings: {
      ...AntdConfig.settings,
      addGroupLabel: "Add new Group",
      fieldSeparator: "__",
      defaultSearchWidth: "20",
      maxNumberOfRules: 10,
      renderIcon: ({ type }) => {
        if (
          type === "addGroup" ||
          type == "addRuleGroup" ||
          type == "addRule"
        ) {
          return <Plus className="ml-2 w-4 h-4" />;
        } else if (type == "drag") {
          return <Grip className="w-4 h-4" />;
        }
      },
      renderField: (props) => {
        return <FieldSelector {...props} />;
      },
      renderOperator: (props) => {
        return <FieldSelector {...props} />;
      },

      renderButton: (props) => {
        return (
          <Button
            key={props.key}
            onClick={props.onClick}
            disabled={props.readonly}
            className="mx-2"
            size={"sm"}
            variant={"outline"}
          >
            {props.label}
            {props.renderIcon &&
              props.renderIcon({
                type: props.type,
                config: props.config,
              })}
          </Button>
        );
      },
    },

    fields: data as any,
  };
};
