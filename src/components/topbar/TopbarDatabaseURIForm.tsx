import * as React from "react";
import { Input } from "@geist-ui/react";
import { ArrowRight } from "@geist-ui/react-icons";

import styles from "./Topbar.module.css";
import { useURIStore } from "../../data/uri";
import { useURIForm, UseURIFormData } from "../../hooks/uriForm";

const TopbarDatabaseURIForm: React.FC = () => {
  const [currentRecord] = useURIStore((state) => [state.currentRecord]);

  const defaultValues: UseURIFormData = {
    databaseURI: currentRecord || "",
  };

  const { register, submit, reset, getValues } = useURIForm({
    defaultValues,
  });

  // NOTE(kosi): Reset topbar if its empty and loses focus
  const handleBlur: React.Dispatch<React.FocusEvent> = (e) => {
    const values = getValues();

    if (values.databaseURI?.length === 0) {
      reset({ databaseURI: currentRecord || "" });
    }
  };

  return (
    <Input
      className={styles.TopbarDatabaseURIForm}
      placeholder="Enter PostgreSQL database URI..."
      label="Database URI"
      width="100%"
      iconClickable
      initialValue={!!currentRecord ? currentRecord : ""}
      {...register("databaseURI", { required: true })}
      onIconClick={submit}
      onBlur={handleBlur}
      iconRight={<ArrowRight />}
    />
  );
};

export default TopbarDatabaseURIForm;
