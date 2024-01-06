"use client";
import React, { useState, useCallback } from "react";
import type {
  JsonGroup,
  Config,
  ImmutableTree,
  BuilderProps,
} from "@react-awesome-query-builder/antd"; //
import {
  Query,
  Builder,
  Utils as QbUtils,
} from "@react-awesome-query-builder/antd";

import "@react-awesome-query-builder/ui/css/styles.css";
import "./rules-builder.css";
import { Button } from "../../ui/button";
import { useSearchParams } from "@search-params/react";
import { config as SearchConfig } from "@/app/_lib/search-config";
import { Separator } from "../../ui/separator";
import { Badge } from "../../ui/badge";
import { ScanSearch } from "lucide-react";

const queryValue: JsonGroup = { id: QbUtils.uuid(), type: "group" };

const RulesBuilder: React.FC<{ config: Config; handleClose: () => void }> = ({
  config,
  handleClose,
}) => {
  const { setQuery, query } = useSearchParams({
    route: SearchConfig.home,
  });

  const [state, setState] = useState({
    tree: QbUtils.checkTree(
      QbUtils.loadTree((query as any) ?? queryValue),
      config
    ),
    config: config,
  });

  const ApplyFilter = () => {
    var queryData = QbUtils.getTree(state.tree);

    setQuery({
      query: {
        ...queryData,
      },
    });
    handleClose();
  };

  const onChange = useCallback(
    (immutableTree: ImmutableTree, config: Config) => {
      setState((prevState) => ({
        ...prevState,
        tree: immutableTree,
        config: config,
      }));

      const jsonTree = QbUtils.getTree(immutableTree);
      console.log(jsonTree);
    },
    []
  );

  const renderBuilder = useCallback(
    (props: BuilderProps) => (
      <div className="query-builder-container">
        <div className="query-builder qb-lite" style={{ margin: 0 }}>
          <Builder {...props} />
        </div>
      </div>
    ),
    []
  );

  return (
    <div>
      <div className="flex items-center px-2 pt-2  gap-x-2">
        <h1 className="font-bold">Add filter</h1>
        <Badge variant={"outline"}>Technical preview</Badge>
      </div>
      <Separator className="my-2" />
      <div className="p-3 space-y-4">
        <Query
          {...config}
          value={state.tree}
          onChange={onChange}
          renderBuilder={renderBuilder}
        />

        <div className="query-builder-result">
          <div className="flex gap-x-2 items-center">
            <ScanSearch className="w-4 h-4" />
            <h1 className="font-bold">Previwe</h1>
          </div>
          <Badge variant={"outline"} className="text-xs">
            {QbUtils.spelFormat(state.tree, state.config)}
          </Badge>
        </div>

        <div className="query-builder-result">
          <div className="flex gap-x-2 items-center">
            <ScanSearch className="w-4 h-4" />
            <h1 className="font-bold">For Dev</h1>
          </div>
          <Badge variant={"outline"} className="text-xs">
            {JSON.stringify(
              QbUtils.elasticSearchFormat(state.tree, state.config),
              null,
              2
            )}
          </Badge>
        </div>
        <div className=" flex justify-end ">
          <Button variant={"default"} onClick={() => ApplyFilter()}>
            Apply Filter
          </Button>
        </div>
      </div>
    </div>
  );
};
export default RulesBuilder;
