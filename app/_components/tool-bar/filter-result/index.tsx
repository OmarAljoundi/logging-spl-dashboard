"use client";
import useConfig from "@/app/_hooks/use-config";
import { config } from "@/app/_lib/search-config";
import { useSearchParams } from "@search-params/react";
import { FunctionComponent, useCallback, useMemo } from "react";
import { Badge } from "../../ui/badge";
import { X } from "lucide-react";
import {
  Query,
  Builder,
  Utils as QbUtils,
  JsonItem,
  JsonGroup,
  JsonCaseGroup,
  JsonRule,
} from "@react-awesome-query-builder/antd";
import { ProcessConditions } from "@/app/_lib/helper";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";

interface FilterResultProps {}

const FilterResult: FunctionComponent<FilterResultProps> = () => {
  const { searchInterval, query, setQuery } = useSearchParams({
    route: config.home,
  });
  const { config: searchConfig, isLoading } = useConfig();

  const formatChild = (id: string, child: any) => {
    console.log("query", query);
    const queryValue: JsonGroup = {
      id: id,
      type: "group",
      children1: [{ ...child }],
    };
    try {
      console.log("child", queryValue);
      var state = QbUtils.checkTree(
        QbUtils.loadTree(queryValue),
        searchConfig!
      );
      var sql = QbUtils.sqlFormat(state, searchConfig!);
      console.log("sql", sql);
      return sql;
    } catch (ex) {
      console.log("ex", { ex });
      return "spel2";
    }
  };

  const deleteGroupOrRule = (id: string, child: any) => {
    const queryValue: JsonGroup = {
      id: id,
      type: "group",
      children1: [
        ...(query as any).children1.filter((x: any) => x.id !== child.id),
      ],
    };

    setQuery({
      query: {
        ...queryValue,
      },
    });
  };

  const filterData = useMemo(() => {
    if (query && searchConfig) {
      const checkTree = QbUtils.checkTree(
        QbUtils.loadTree(query as any),
        searchConfig!
      );

      const tree = QbUtils.getTree(checkTree);

      return { childern: tree.children1 as any[], id: tree.id };
    }

    return { childern: [], id: undefined };
  }, [query, searchConfig]);

  return (
    <div className="flex gap-x-2 flex-wrap">
      {searchInterval && (
        <Badge variant={"outline"} className="py-2">
          {searchInterval.label}
          <X className="w-3 h-3 ml-3 " />
        </Badge>
      )}
      {filterData && filterData.childern.length > 0 && (
        <>
          {filterData.childern.map((filter) => (
            <Tooltip key={filter.id}>
              <TooltipTrigger>
                <Badge
                  variant={"outline"}
                  className="py-2 hover:opacity-40 duration-300 transition-all cursor-pointer"
                  onClick={() => deleteGroupOrRule(filterData.id!, filter)}
                >
                  {formatChild(filterData.id!, filter)}
                  <X className="w-3 h-3 ml-3 " />
                </Badge>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="flex items-center gap-4 bg-destructive"
              >
                Click to remove the filter
              </TooltipContent>
            </Tooltip>
          ))}
        </>
      )}
    </div>
  );
};

export default FilterResult;
