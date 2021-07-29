import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Input,
  AutoComplete,
  Text,
  Button,
  Code,
  Grid,
  // Checkbox,
} from "@geist-ui/react";
import { useVerifyURI } from "../../hooks/verifyURI";
import styled from "styled-components";

import { GetNetworkRequest } from "../../api/network";
import { useQueryStore } from "../../data/query";
import { useTypes } from "../../hooks/types";
import { useClearQuery } from "../../hooks/disconnect";
import { AutoCompleteOptions } from "@geist-ui/react/dist/auto-complete/auto-complete";
import { useNetworkData } from "../../hooks/networkData";

export interface SidebarQueryCollapseFormData {
  type: string;
  id: number;
  depthLimit: number;
  objectLimit: number;
  depthFirst: boolean;
}
const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

// TODO(kosi): Add schema validation to form
const SidebarQueryCollapseForm: React.FC = () => {
  const [setQueryStore, lastQuery] = useQueryStore((state) => [
    state.set,
    state.lastQuery,
  ]);

  const {
    register,
    handleSubmit,
    setValue,
    // watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SidebarQueryCollapseFormData>({
    mode: "onChange",
    defaultValues: {
      id: !!lastQuery ? lastQuery?.id : undefined,
      type: !!lastQuery ? lastQuery?.type : "",
      depthLimit: 2,
      objectLimit: 100,
      depthFirst: false,
    },
  });

  const { isLoading: loadingNetwork } = useNetworkData();

  const { data: types, isLoading: loadingTypes } = useTypes();
  const { clearQuery } = useClearQuery();
  const { data, currentRecord, isLoading: loadingURI } = useVerifyURI();

  const [options, setOptions] = React.useState<AutoCompleteOptions>([]);

  React.useEffect(() => {
    register("type", { required: true });
    register("depthFirst");
  }, [register]);

  const onSubmit: SubmitHandler<SidebarQueryCollapseFormData> = async (
    data
  ) => {
    const params: GetNetworkRequest = Object.assign({}, data, {
      uri: currentRecord!,
    });

    clearQuery();

    setQueryStore((draft) => {
      draft.lastQuery = params;
    });
  };

  const searchHandler = (currentValue: string) => {
    if (!currentValue)
      return setOptions(
        !!types ? types.map((type) => ({ label: type, value: type })) : []
      );
    if (!!types) {
      const relatedOptions = types
        .filter((type) => type.includes(currentValue))
        .map((type) => ({ label: type, value: type }));

      setOptions(relatedOptions);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid.Container gap={2} direction="column">
        <Grid xs>
          <SelectContainer>
            <Text
              type="secondary"
              style={{
                display: "inline-flex",
                margin: 0,
                marginBottom: "10px",
              }}
            >
              <Code>type</Code>
            </Text>
            <AutoComplete
              status={!!errors.type ? "error" : "default"}
              width="100%"
              initialValue={!!lastQuery ? lastQuery.type : ""}
              disabled={loadingURI || !data || loadingTypes}
              onChange={(value) => setValue("type", value)}
              placeholder="Select type of object..."
              onSearch={searchHandler}
              options={!!types ? options : []}
            />
          </SelectContainer>
        </Grid>
        <Grid xs>
          <Input
            status={!!errors.id ? "error" : "default"}
            width="100%"
            disabled={loadingURI || !data}
            placeholder="Enter id of object..."
            {...register("id", { required: true, valueAsNumber: true })}
          >
            <Code>id</Code>
          </Input>
        </Grid>
        <Grid xs>
          <Input
            status={!!errors.depthLimit ? "error" : "default"}
            width="100%"
            disabled={loadingURI || !data}
            placeholder="Enter depth limit of graph..."
            {...register("depthLimit", { required: true, valueAsNumber: true })}
          >
            <Code>depthLimit</Code>
          </Input>
        </Grid>
        <Grid xs>
          <Input
            status={!!errors.objectLimit ? "error" : "default"}
            width="100%"
            disabled={loadingURI || !data}
            placeholder="Enter maximum objects of graph..."
            {...register("objectLimit", {
              required: true,
              valueAsNumber: true,
            })}
          >
            <Code>objectLimit</Code>
          </Input>
        </Grid>
        {/* NOTE(kosi): Depth-first query feature was planned, but due to performance issues is disabled for now. */}
        {/* <Grid xs>
          <Checkbox
            width="100%"
            initialChecked={!!lastQuery ? lastQuery?.depthFirst : false}
            disabled={loadingURI || !data}
            checked={watch("depthFirst")}
            onChange={(value) => setValue("depthFirst", value.target.checked)}
            size="small"
            placeholder="Enter maximum objects of graph..."
          >
            <Code>depthFirst</Code>
          </Checkbox>
        </Grid> */}
        <Grid justify="center" xs>
          <Button
            loading={isSubmitting || loadingNetwork}
            disabled={!isValid}
            style={{ width: "100%", marginTop: 10 }}
            htmlType="submit"
          >
            Submit
          </Button>
        </Grid>
        <Grid
          style={{
            display: !lastQuery || !loadingNetwork ? "none" : "block",
          }}
          justify="center"
          xs
        >
          <Button
            style={{ width: "100%", marginTop: 10 }}
            onClick={() =>
              setQueryStore((draft) => {
                draft.lastQuery = null;
              })
            }
          >
            Cancel Query
          </Button>
        </Grid>
      </Grid.Container>
    </form>
  );
};

export default SidebarQueryCollapseForm;
