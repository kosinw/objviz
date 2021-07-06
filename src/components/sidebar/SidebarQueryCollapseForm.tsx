import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input, Button, Code, Grid, useToasts } from "@geist-ui/react";

export interface SidebarQueryCollapseFormData {
  type: string;
  id: number;
}

export interface SidebarQueryCollapseFormProps {
  defaultValues?: Record<string, any>;
}

// TODO(kosi): Add schema validation to form
// TODO(kosi): Handle form submission
const SidebarQueryCollapseForm: React.FC<SidebarQueryCollapseFormProps> = ({
  defaultValues = { type: "account", id: "" },
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm({ mode: "onChange", defaultValues });
  const [, setToast] = useToasts();

  // TODO(kosi): Replace this with a real form submission function
  const onSubmit: SubmitHandler<SidebarQueryCollapseFormData> = async (
    data
  ) => {
    await new Promise((resolve) =>
      setTimeout(() => {
        setToast({ text: `Form submission: ${JSON.stringify(data)}` });
        resolve(null);
      }, 1000)
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid.Container gap={2} direction="column">
        <Grid xs>
          {/* TODO(kosi): Remove disabled and make this a dropdown instead of an input */}
          <Input
            status={!!errors.type ? "error" : "default"}
            width="100%"
            readOnly
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
            placeholder="Enter id of object..."
            {...register("id", { required: true })}
          >
            <Code>id</Code> (required)
          </Input>
        </Grid>
        <Grid justify="center" xs>
          <Button
            loading={isSubmitting}
            disabled={!isValid || isSubmitting || !isDirty}
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
