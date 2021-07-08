import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input, Button, Code, Grid, useToasts } from "@geist-ui/react";
import { useVerifyURI } from "../../hooks/verifyURI";
import { useQueryClient } from "react-query";
import { getNetwork, GetNetworkRequest } from "../../api/network";
import { useQueryStore } from "../../data/query";

export interface SidebarQueryCollapseFormData {
  type: string;
  id: number;
}

export interface SidebarQueryCollapseFormProps {
  defaultValues?: SidebarQueryCollapseFormData;
}

// TODO(kosi): Add schema validation to form
const SidebarQueryCollapseForm: React.FC<SidebarQueryCollapseFormProps> = ({
  defaultValues = { type: "account" },
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<SidebarQueryCollapseFormData>({
    mode: "onChange",
    defaultValues,
  });

  const [, setToast] = useToasts();
  const { data, currentRecord, isLoading } = useVerifyURI();
  const queryClient = useQueryClient();
  const [setQueryStore] = useQueryStore((state) => [state.set]);

  // TODO(kosi): Replace this with a real form submission function
  const onSubmit: SubmitHandler<SidebarQueryCollapseFormData> = async (
    data
  ) => {
    const params: GetNetworkRequest = Object.assign({}, data, {
      depthLimit: 10,
      uri: currentRecord!,
    });

    const response = await getNetwork(params);

    // NOTE(kosi): If we are at this point, the response has not thrown any exceptions and we are safe
    setQueryStore((draft) => {
      draft.lastQuery = params;
    });

    queryClient.setQueryData(["getNetwork", params], response);

    setToast({ type: "success", text: "Success: Visualization query was successful!" })

    // await new Promise((resolve) =>
    //   setTimeout(() => {
    //     setToast({ text: `Form submission: ${JSON.stringify(data)}` });
    //     resolve(null);
    //   }, 1000)
    // );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid.Container gap={2} direction="column">
        <Grid xs>
          {/* TODO(kosi): Remove readOnly and make this a dropdown instead of an input */}
          <Input
            status={!!errors.type ? "error" : "default"}
            width="100%"
            readOnly
            disabled={isLoading || !data}
            placeholder="Enter type of object..."
            {...register("type")}
          >
            <Code>type</Code> (optional)
          </Input>
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
        <Grid justify="center" xs>
          <Button
            loading={isSubmitting}
            disabled={
              !isValid || isSubmitting || !isDirty || isLoading || !data
            }
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
