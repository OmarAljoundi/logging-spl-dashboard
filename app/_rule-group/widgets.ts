import { AntdConfig, Widgets } from "@react-awesome-query-builder/antd";

export const widgets: Widgets = {
    ...AntdConfig.widgets,
    // examples of overriding
    text: {
        ...AntdConfig.widgets.text,
        fullWidth: true,
        customProps: {
            className:
                "!flex !h-8  !rounded-md !border !border-input !bg-transparent !px-3 !py-1 !text-sm !shadow-sm !transition-colors !placeholder:text-muted-foreground !focus-visible:outline-none !focus-visible:ring-1 !focus-visible:ring-ring !disabled:cursor-not-allowed !disabled:opacity-50",
        },
    },
    number: {
        ...AntdConfig.widgets.number,
        customProps: {
            className:
                "!flex !h-8  !rounded-md !border !border-input !bg-transparent !px-3 !py-1 !text-sm !shadow-sm !transition-colors !placeholder:text-muted-foreground !focus-visible:outline-none !focus-visible:ring-1 !focus-visible:ring-ring !disabled:cursor-not-allowed !disabled:opacity-50",
        },
    },
    textarea: {
        ...AntdConfig.widgets.textarea,
        maxRows: 3,
        customProps: {
            className:
                "!flex !h-8  !rounded-md !border !border-input !bg-transparent !px-3 !py-1 !text-sm !shadow-sm !transition-colors !placeholder:text-muted-foreground !focus-visible:outline-none !focus-visible:ring-1 !focus-visible:ring-ring !disabled:cursor-not-allowed !disabled:opacity-50",
        },
    },
    // slider: {
    //   ...AntdConfig.widgets.slider
    // },
    // rangeslider: {
    //   ...AntdConfig.widgets.rangeslider
    // },
    date: {
        ...AntdConfig.widgets.date,
        dateFormat: "DD.MM.YYYY",
        valueFormat: "YYYY-MM-DD",
        customProps: {
            className:
                "!flex !h-8  !rounded-md !border !border-input !bg-transparent !px-3 !py-1 !text-sm !shadow-sm !transition-colors !placeholder:text-muted-foreground !focus-visible:outline-none !focus-visible:ring-1 !focus-visible:ring-ring !disabled:cursor-not-allowed !disabled:opacity-50",
        },
    },
    time: {
        ...AntdConfig.widgets.time,
        timeFormat: "HH:mm",
        valueFormat: "HH:mm:ss",
        customProps: {
            className:
                "!flex !h-8  !rounded-md !border !border-input !bg-transparent !px-3 !py-1 !text-sm !shadow-sm !transition-colors !placeholder:text-muted-foreground !focus-visible:outline-none !focus-visible:ring-1 !focus-visible:ring-ring !disabled:cursor-not-allowed !disabled:opacity-50",
        },
    },
    datetime: {
        ...AntdConfig.widgets.datetime,
        timeFormat: "HH:mm",
        dateFormat: "DD.MM.YYYY",
        valueFormat: "YYYY-MM-DD HH:mm:ss",
        customProps: {
            className:
                "!flex !h-8  !rounded-md !border !border-input !bg-transparent !px-3 !py-1 !text-sm !shadow-sm !transition-colors !placeholder:text-muted-foreground !focus-visible:outline-none !focus-visible:ring-1 !focus-visible:ring-ring !disabled:cursor-not-allowed !disabled:opacity-50",
        },
    },
    // func: {
    //   ...AntdConfig.widgets.func,
    //   customProps: {
    //     showSearch: true
    //   }
    // },
    select: {
        ...AntdConfig.widgets.select,
        customProps: {
            className:
                "!flex !h-8  !rounded-md !border !border-input !bg-transparent !px-3 !py-1 !text-sm !shadow-sm !transition-colors !placeholder:text-muted-foreground !focus-visible:outline-none !focus-visible:ring-1 !focus-visible:ring-ring !disabled:cursor-not-allowed !disabled:opacity-50",
        },
    },
    multiselect: {
        ...AntdConfig.widgets.multiselect,
        customProps: {
            input: {
                className:
                    "!flex !h-8  !rounded-md !border !border-input !bg-transparent !px-3 !py-1 !text-sm !shadow-sm !transition-colors !placeholder:text-muted-foreground !focus-visible:outline-none !focus-visible:ring-1 !focus-visible:ring-ring !disabled:cursor-not-allowed !disabled:opacity-50",
            },
        },
    },
    // treeselect: {
    //   ...AntdConfig.widgets.treeselect,
    //   customProps: {
    //     showSearch: true
    //   }
    // },
};
