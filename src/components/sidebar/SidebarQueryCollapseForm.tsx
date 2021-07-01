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
  defaultValues = { type: "", id: "" },
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm({ mode: "onChange", defaultValues });
  const [, setToast] = useToasts();

  const onSubmit: SubmitHandler<SidebarQueryCollapseFormData> = (data) => {
    setToast({ text: `Form submission: ${JSON.stringify(data)}` });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid.Container gap={2} direction="column">
        <Grid xs>
          <Input
            status={!!errors.type ? "error" : "default"}
            width="100%"
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
