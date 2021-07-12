import * as React from "react";
import { Input } from "@geist-ui/react";
import { ArrowRight } from "@geist-ui/react-icons";

import styles from "./Topbar.module.css";
import { useURIStore } from "../../data/uri";
import { useURIForm, UseURIFormData } from "../../hooks/uriForm";

// TODO(kosi): Add autocomplete functionality when searching for database URIs
const TopbarDatabaseURIForm: React.FC = () => {
  const [currentRecord] = useURIStore((state) => [state.currentRecord]);

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
    <Input
      disabled={!!currentRecord}
      className={styles.TopbarDatabaseURIForm}
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
