import * as React from "react";
import { Input } from "@geist-ui/react";
import { ArrowRight } from "@geist-ui/react-icons";

import { useURIStore } from "../../data/uri";
import { useURIForm, UseURIFormData } from "../../hooks/uriForm";
import styled from "styled-components";

// TODO(kosi): Add autocomplete functionality when searching for database URIs
const StyledInput = styled(Input)`
  max-width: "1200px";
`;

const TopbarDatabaseURIForm: React.FC = () => {
  const [currentRecord] = useURIStore((state) => [state.uri]);

  const defaultValues: UseURIFormData = {
    databaseURI: currentRecord || "",
  };

  const { register, submit, reset } = useURIForm({
    defaultValues,
  });

  React.useEffect(() => {
    if (!currentRecord) {
      reset({ databaseURI: "" });
    } else {
      reset({ databaseURI: currentRecord });
    }
  }, [reset, currentRecord]);

  return (
    <StyledInput
      disabled={!!currentRecord}
      placeholder="Enter PostgreSQL database URI..."
      label="Database URI"
      width="100%"
      iconClickable
      initialValue={!!currentRecord ? currentRecord : ""}
      {...register("databaseURI", { required: true })}
      onIconClick={submit}
      iconRight={<ArrowRight />}
    />
  );
};

export default TopbarDatabaseURIForm;
