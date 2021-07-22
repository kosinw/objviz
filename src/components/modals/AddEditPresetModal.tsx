import {
  Modal,
  Text,
  Input,
  Grid,
  Button,
  Dot,
  useToasts,
} from "@geist-ui/react";
import { X } from "@geist-ui/react-icons";
import * as React from "react";
import {
  UseFormSetValue,
  useForm,
  SubmitHandler,
  SubmitErrorHandler,
} from "react-hook-form";
import { parse, ConnectionOptions } from "pg-connection-string";
import { SidebarConnectCollapseFormInputs } from "../sidebar/SidebarConnectCollapseForm";
import BaseModal, { SharedModalProps } from "./BaseModal";
import styled from "styled-components";
import { LastConnected, usePresetStore } from "../../data/preset";
import { verifyURI } from "../../api/uri";

export type AddEditModalProps = SharedModalProps & {
  presetToModify: string;
  setValue: UseFormSetValue<SidebarConnectCollapseFormInputs>;
};

type AddEditPresetModalFormProps = {
  name: string;
  host: string;
  port: string;
  user: string;
  password: string;
  database: string;
  uri: string;
  lastConnected: LastConnected;
};

type AddEditPresetModalFormPropsKeys = keyof AddEditPresetModalFormProps;
const AddEditPresetModalFormComponentFields = [
  "host",
  "port",
  "user",
  "password",
  "database",
];

const ModalFormContainer = styled.form`
  margin-top: 1.6rem;
  display: flex;
  flex-direction: column;
`;

const AddEditPresetModal: React.FC<AddEditModalProps> = ({
  setVisible,
  bindings,
  presetToModify,
  setValue: setSelectedPreset,
}) => {
  const editMode = !!presetToModify;
  const { presets, set: setPresets } = usePresetStore((state) => state);
  const [, setToast] = useToasts();

  const config: Partial<ConnectionOptions> = editMode
    ? parse(presets[presetToModify].uri)
    : {};

  const defaultValues: AddEditPresetModalFormProps = editMode
    ? {
        name: presets[presetToModify].name,
        uri: presets[presetToModify].uri,
        host: config.host || "",
        port: config.port || "",
        user: config.user || "",
        password: config.password || "",
        database: config.database || "",
        lastConnected: presets[presetToModify].lastConnected,
      }
    : {
        name: "",
        host: "",
        port: "",
        user: "",
        password: "",
        database: "",
        uri: "",
        lastConnected: LastConnected.Indeterminate,
      };

  const {
    register,
    watch,
    reset,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    defaultValues,
  });

  React.useEffect(() => {
    register("name", { required: true });
    register("uri", { required: true });
    register("host", { required: true });
    register("port");
    register("user");
    register("password");
    register("database", { required: true });
  }, [register]);

  const onSubmit: SubmitHandler<AddEditPresetModalFormProps> = async (
    value
  ) => {
    const newKey = editMode ? presetToModify : value.name + "-" + Date.now();

    // NOTE(kosi): First you have to check if there is a preset w/ the same name before adding
    if (
      Object.keys(presets).some(
        (key) =>
          presets[key].name === value.name &&
          key !== presetToModify &&
          !presets[key].deleted
      )
    ) {
      setToast({
        type: "error",
        text: "Please use a different name for your preset. This name has already been used.",
      });
      return;
    }

    setPresets((draft) => {
      draft.presets[newKey] = {
        name: value.name,
        uri: value.uri,
        deleted: false,
        lastConnected: value.lastConnected,
      };
    });

    if (!editMode) {
      setSelectedPreset("preset", newKey);
    }

    await onTestConnection();
    onCancel();
  };

  const onError: SubmitErrorHandler<AddEditPresetModalFormProps> = async (
    errors
  ) => {
    Object.keys(errors).forEach((error) => {
      setToast({
        type: "error",
        text: `The "${error}" field is required.`,
      });
    });
  };

  const { name, uri, host, port, user, password, database, lastConnected } =
    watch();

  const submit = handleSubmit(onSubmit, onError);

  const onFormFieldChange: React.Dispatch<React.ChangeEvent<HTMLInputElement>> =
    (e) => {
      setValue(
        e.target.name as AddEditPresetModalFormPropsKeys,
        e.target.value
      );

      if (e.target.name === "uri") {
        const newFields = parse(e.target.value);

        Object.keys(newFields).forEach((field) => {
          if (AddEditPresetModalFormComponentFields.includes(field)) {
            const v = newFields[field as keyof ConnectionOptions];
            setValue(
              field as AddEditPresetModalFormPropsKeys,
              !!v ? (v as string) : ""
            );
          }
        });
      } else if (e.target.name === "name") {
        return;
      } else {
        const { user, password, host, port, database } = getValues();
        const newUri = `postgres://${user}${!!password ? ":" : ""}${password}${
          !!user || !!password ? "@" : ""
        }${host}${!!port ? ":" : ""}${port}/${database}`;
        setValue("uri", newUri);
      }
    };

  const onDelete = () => {
    setPresets((draft) => {
      draft.presets[presetToModify].deleted = true;
    });

    onCancel();
  };

  const onTestConnection = async () => {
    const result = await verifyURI(uri);

    setValue(
      "lastConnected",
      result ? LastConnected.Success : LastConnected.Failure
    );

    setToast({
      text: result
        ? "Connected to database successfully."
        : "Could not connect to database.",
      type: result ? "success" : "error",
    });

    if (editMode) {
      setPresets((draft) => {
        draft.presets[presetToModify].lastConnected = result
          ? LastConnected.Success
          : LastConnected.Failure;
      });
    }
  };

  const onCancel = () => {
    setVisible(false);
    reset(defaultValues);
  };

  return (
    <BaseModal
      bindings={Object.assign({}, bindings, { onClose: onCancel })}
      setVisible={setVisible}
    >
      <Modal.Content>
        <Text style={{ lineHeight: "30px", textAlign: "center" }} h3>
          {editMode ? "Modify Preset" : "Add Preset"}
        </Text>
        <ModalFormContainer onSubmit={submit}>
          <Grid.Container direction="column" gap={2}>
            <Grid xs>
              <Input
                onChange={onFormFieldChange}
                value={name}
                name="name"
                width="100%"
                label="Name"
                status={!!errors.name ? "error" : "default"}
              />
            </Grid>
            <Grid xs>
              <Input
                onChange={onFormFieldChange}
                value={uri}
                name="uri"
                width="100%"
                label="URI"
                status={!!errors.uri ? "error" : "default"}
              />
            </Grid>
            <Grid xs>
              <Grid.Container gap={3}>
                <Grid xs>
                  <Input
                    onChange={onFormFieldChange}
                    value={host}
                    name="host"
                    width="100%"
                    label="Host"
                    status={!!errors.host ? "error" : "default"}
                  />
                </Grid>
                <Grid xs>
                  <Input
                    onChange={onFormFieldChange}
                    value={port}
                    name="port"
                    width="100%"
                    label="Port"
                  />
                </Grid>
              </Grid.Container>
            </Grid>
            <Grid xs>
              <Grid.Container gap={3}>
                <Grid xs>
                  <Input
                    onChange={onFormFieldChange}
                    value={user}
                    name="user"
                    width="100%"
                    label="User"
                  />
                </Grid>
                <Grid xs>
                  <Input
                    onChange={onFormFieldChange}
                    value={password}
                    name="password"
                    width="100%"
                    label="Password"
                  />
                </Grid>
              </Grid.Container>
            </Grid>
            <Grid xs>
              <Input
                onChange={onFormFieldChange}
                name="database"
                value={database}
                width="100%"
                label="Database"
                status={!!errors.database ? "error" : "default"}
              />
            </Grid>
            <Grid xs>
              <Grid.Container gap={3}>
                <Grid xs={editMode ? 14 : true}>
                  <Button onClick={onTestConnection} style={{ width: "100%" }}>
                    <Dot
                      type={
                        lastConnected === LastConnected.Indeterminate
                          ? "warning"
                          : lastConnected === LastConnected.Failure
                          ? "error"
                          : "success"
                      }
                    />
                    Test Connection
                  </Button>
                </Grid>
                {editMode && (
                  <Grid xs={10}>
                    <Button
                      onClick={onDelete}
                      icon={<X />}
                      type="error"
                      style={{ width: "100%" }}
                    >
                      Delete
                    </Button>
                  </Grid>
                )}
              </Grid.Container>
            </Grid>
          </Grid.Container>
        </ModalFormContainer>
      </Modal.Content>
      <Modal.Action passive onClick={onCancel}>
        Cancel
      </Modal.Action>
      <Modal.Action loading={isSubmitting} onClick={submit}>
        {editMode ? "Update" : "Create"}
      </Modal.Action>
    </BaseModal>
  );
};

export default AddEditPresetModal;
