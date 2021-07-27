import * as React from "react";
import { Breadcrumbs, Card, useToasts } from "@geist-ui/react";
import styled from "styled-components";
import { QueryTree, useQueryStore } from "../../data/query";
import { useSelectedStore } from "../../data/selection";

const ViewerSubqueryBreadcrumbsContainer = styled.div`
  position: absolute;
  /* top: 2%; */
  top: 0;
  left: 0;
  /* left: 2%; */
`;

const ViewerSubqueryBreadcrumbs: React.FC = () => {
  const calculateQueries = (query: QueryTree | null): QueryTree[] => {
    const arr: QueryTree[] = [];
    let ptr: QueryTree | null = query;

    while (!!ptr) {
      arr.push(ptr);
      ptr = ptr.prevQuery || null;
    }

    return arr;
  };

  const [lastQuery, setQueryStore] = useQueryStore((state) => [
    state.lastQuery,
    state.set,
  ]);

  const [reset] = useSelectedStore((state) => [state.reset]);

  const [, setToast] = useToasts();

  const queries = React.useMemo(
    () => calculateQueries(lastQuery).slice().reverse(),
    [lastQuery]
  );

  const onBreadcrumbClick = (
    e: React.MouseEvent<Element, MouseEvent>,
    steps: number
  ) => {
    e.preventDefault();

    if (steps < 1) {
      return;
    }

    setToast({
      text: "Returning to previous query...",
    });

    setQueryStore((draft) => {
      for (let i = 0; i < steps; ++i) {
        draft.lastQuery = draft.lastQuery?.prevQuery || null;
      }

      reset();
    });
  };

  return queries.length > 1 ? (
    <ViewerSubqueryBreadcrumbsContainer>
      <Card style={{ border: "none", backgroundColor: "transparent" }}>
        <Breadcrumbs size="small">
          {queries.map((query, idx) => (
            <Breadcrumbs.Item
              onClick={(e) => onBreadcrumbClick(e, queries.length - idx - 1)}
              href="#"
              key={query.id}
            >
              {query.type} ({query.name})
            </Breadcrumbs.Item>
          ))}
        </Breadcrumbs>
      </Card>
    </ViewerSubqueryBreadcrumbsContainer>
  ) : (
    <React.Fragment />
  );
};

export default ViewerSubqueryBreadcrumbs;
