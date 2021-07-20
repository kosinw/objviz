import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Input,
  AutoComplete,
  Text,
  Button,
  Code,
  Grid,
  useToasts,
} from "@geist-ui/react";
import { useVerifyURI } from "../../hooks/verifyURI";
import { useQueryClient } from "react-query";
import styled from "styled-components";

import { getNetwork, GetNetworkRequest } from "../../api/network";
import { useQueryStore } from "../../data/query";
import { useTypes } from "../../hooks/types";
import { useClearQuery } from "../../hooks/disconnect";
import { AutoCompleteOptions } from "@geist-ui/react/dist/auto-complete/auto-complete";

export interface SidebarQueryCollapseFormData {
  type: string;
  id: number;
  depthLimit: number;
  objectLimit: number;
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
    formState: { errors, isSubmitting, isValid },
  } = useForm<SidebarQueryCollapseFormData>({
    mode: "onChange",
    defaultValues: {
      id: lastQuery?.id,
      type: lastQuery?.type,
      depthLimit: 2,
      objectLimit: 100,
    },
  });

  const { data: types, isLoading: loadingTypes } = useTypes();
  const { clearQuery } = useClearQuery();
  const [, setToast] = useToasts();
  const { data, currentRecord, isLoading } = useVerifyURI();
  const queryClient = useQueryClient();

  const [options, setOptions] = React.useState<AutoCompleteOptions>([]);

  React.useEffect(() => {
    register("type", { required: true });
  }, [register]);

  const onSubmit: SubmitHandler<SidebarQueryCollapseFormData> = async (
    data
  ) => {
    const params: GetNetworkRequest = Object.assign({}, data, {
      uri: currentRecord!,
      objectLimit: 100,
      depthLimit: 2,
    });

    clearQuery();

    try {
      const response = await getNetwork(params);

      if (!response) {
        setToast({
          type: "error",
          text: "Visualization query was not successful!",
        });

        return;
      }

      setQueryStore((draft) => {
        draft.lastQuery = params;
      });

      queryClient.setQueryData(["getNetwork", params], response);

      setToast({
        type: "success",
        text: "Visualization query was successful!",
      });
    } catch {
      setToast({
        type: "error",
        text: "Visualization query was not successful!",
      });
    }
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
              <Code>type</Code>&nbsp;(required)
            </Text>
            <AutoComplete
              status={!!errors.type ? "error" : "default"}
              width="100%"
              initialValue={!!lastQuery ? lastQuery.type : ""}
              disabled={isLoading || !data || loadingTypes}
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
            disabled={isLoading || !data}
            placeholder="Enter id of object..."
            {...register("id", { required: true, valueAsNumber: true })}
          >
            <Code>id</Code> (required)
          </Input>
        </Grid>
        <Grid xs>
          <Input
            width="100%"
            disabled={isLoading || !data}
            placeholder="Enter depth limit of graph..."
            {...register("depthLimit")}
          >
            <Code>depthLimit</Code> (optional)
          </Input>
        </Grid>
        <Grid xs>
          <Input
            width="100%"
            disabled={isLoading || !data}
            placeholder="Enter maximum objects of graph..."
            {...register("objectLimit")}
          >
            <Code>objectLimit</Code> (optional)
          </Input>
        </Grid>
        <Grid justify="center" xs>
          <Button
            loading={isSubmitting}
            disabled={isSubmitting || isLoading || !data || !isValid}
            style={{ width: "100%", marginTop: 10 }}
            htmlType="submit"
          >
            Submit
          </Button>
        </Grid>
      </Grid.Container>
    </form>
  );
};

export default SidebarQueryCollapseForm;
