"use client";
import { Button } from "@/app/_components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { AntdConfig, AntdWidgets } from "@react-awesome-query-builder/antd";
import type {
  Config,
  Operators,
  Widgets,
} from "@react-awesome-query-builder/antd";
import { Grip, Plus } from "lucide-react";
import { Input } from "../_components/ui/input";
import { FieldSelector } from "../_components/custom-renders/field-selector";
const { FieldCascader, FieldDropdown, FieldTreeSelect } = AntdWidgets;
const InitialConfig = AntdConfig;

const widgets: Widgets = {
  ...InitialConfig.widgets,
  // examples of overriding
  text: {
    ...InitialConfig.widgets.text,
    fullWidth: true,
    customProps: {
      className:
        "!flex !h-8  !rounded-md !border !border-input !bg-transparent !px-3 !py-1 !text-sm !shadow-sm !transition-colors !placeholder:text-muted-foreground !focus-visible:outline-none !focus-visible:ring-1 !focus-visible:ring-ring !disabled:cursor-not-allowed !disabled:opacity-50",
    },
  },
  number: {
    ...InitialConfig.widgets.number,
    customProps: {
      className:
        "!flex !h-8  !rounded-md !border !border-input !bg-transparent !px-3 !py-1 !text-sm !shadow-sm !transition-colors !placeholder:text-muted-foreground !focus-visible:outline-none !focus-visible:ring-1 !focus-visible:ring-ring !disabled:cursor-not-allowed !disabled:opacity-50",
    },
  },
  textarea: {
    ...InitialConfig.widgets.textarea,
    maxRows: 3,
    customProps: {
      className:
        "!flex !h-8  !rounded-md !border !border-input !bg-transparent !px-3 !py-1 !text-sm !shadow-sm !transition-colors !placeholder:text-muted-foreground !focus-visible:outline-none !focus-visible:ring-1 !focus-visible:ring-ring !disabled:cursor-not-allowed !disabled:opacity-50",
    },
  },
  // slider: {
  //   ...InitialConfig.widgets.slider
  // },
  // rangeslider: {
  //   ...InitialConfig.widgets.rangeslider
  // },
  date: {
    ...InitialConfig.widgets.date,
    dateFormat: "DD.MM.YYYY",
    valueFormat: "YYYY-MM-DD",
    customProps: {
      className:
        "!flex !h-8  !rounded-md !border !border-input !bg-transparent !px-3 !py-1 !text-sm !shadow-sm !transition-colors !placeholder:text-muted-foreground !focus-visible:outline-none !focus-visible:ring-1 !focus-visible:ring-ring !disabled:cursor-not-allowed !disabled:opacity-50",
    },
  },
  time: {
    ...InitialConfig.widgets.time,
    timeFormat: "HH:mm",
    valueFormat: "HH:mm:ss",
    customProps: {
      className:
        "!flex !h-8  !rounded-md !border !border-input !bg-transparent !px-3 !py-1 !text-sm !shadow-sm !transition-colors !placeholder:text-muted-foreground !focus-visible:outline-none !focus-visible:ring-1 !focus-visible:ring-ring !disabled:cursor-not-allowed !disabled:opacity-50",
    },
  },
  datetime: {
    ...InitialConfig.widgets.datetime,
    timeFormat: "HH:mm",
    dateFormat: "DD.MM.YYYY",
    valueFormat: "YYYY-MM-DD HH:mm:ss",
    customProps: {
      className:
        "!flex !h-8  !rounded-md !border !border-input !bg-transparent !px-3 !py-1 !text-sm !shadow-sm !transition-colors !placeholder:text-muted-foreground !focus-visible:outline-none !focus-visible:ring-1 !focus-visible:ring-ring !disabled:cursor-not-allowed !disabled:opacity-50",
    },
  },
  // func: {
  //   ...InitialConfig.widgets.func,
  //   customProps: {
  //     showSearch: true
  //   }
  // },
  select: {
    ...InitialConfig.widgets.select,
    customProps: {
      className:
        "!flex !h-8  !rounded-md !border !border-input !bg-transparent !px-3 !py-1 !text-sm !shadow-sm !transition-colors !placeholder:text-muted-foreground !focus-visible:outline-none !focus-visible:ring-1 !focus-visible:ring-ring !disabled:cursor-not-allowed !disabled:opacity-50",
    },
  },
  multiselect: {
    ...InitialConfig.widgets.multiselect,
    customProps: {
      input: {
        className:
          "!flex !h-8  !rounded-md !border !border-input !bg-transparent !px-3 !py-1 !text-sm !shadow-sm !transition-colors !placeholder:text-muted-foreground !focus-visible:outline-none !focus-visible:ring-1 !focus-visible:ring-ring !disabled:cursor-not-allowed !disabled:opacity-50",
      },
    },
  },
  // treeselect: {
  //   ...InitialConfig.widgets.treeselect,
  //   customProps: {
  //     showSearch: true
  //   }
  // },
};

const useConfig = () => {
  const { data: config, isLoading } = useQuery({
    queryKey: ["Open-Search-Mapping"],
    queryFn: async () =>
      (await fetch("http://localhost:3000/api/open-search/get-mapping")).json(),
    select: (data) => {
      const operators: Operators = {
        ...InitialConfig.operators,
        like: {
          ...InitialConfig.operators.like,
          label: "Contains",
          elasticSearchQueryType: "wildcard",
        },
      };
      const config: Config = {
        ...InitialConfig,
        operators: operators,
        widgets: widgets,
        settings: {
          ...InitialConfig.settings,
          addGroupLabel: "Add new Group",
          canLeaveEmptyGroup: true,
          fieldSeparator: "__",
          canLeaveEmptyCase: true,
          defaultSearchWidth: "20",
          clearValueOnChangeField: true,
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

        fields: data.result as any,
      };
      return config;
    },
  });

  return { config, isLoading };
};
export default useConfig;
