import * as React from "react";

import {
  Grid,
  Button,
  Select,
  Text,
  Dot,
  useModal,
  useToasts,
} from "@geist-ui/react";
import { Plus, Edit } from "@geist-ui/react-icons";
import { SubmitHandler, useForm } from "react-hook-form";

import styled from "styled-components";

import { LastConnected, usePresetStore } from "../../data/preset";
import AddEditPresetModal from "../modals/AddEditPresetModal";
import { verifyURI } from "../../api/uri";
import { useQueryClient } from "react-query";
import { useURIStore } from "../../data/uri";
import { useDisconnect } from "../../hooks/disconnect";

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export type SidebarConnectCollapseFormInputs = {
  preset: string;
};

const SidebarConnectCollapseForm: React.FC = () => {
  const presets = usePresetStore((state) => state.presets);
  const [, setToast] = useToasts();
  const { setVisible, bindings } = useModal(false);
  const queryClient = useQueryClient();
  const [currentRecord, setURIStore] = useURIStore((state) => [
    state.uri,
    state.set,
  ]);
  const { disconnect } = useDisconnect();

  const { register, handleSubmit, getValues, watch, setValue } =
    useForm<SidebarConnectCollapseFormInputs>({
      mode: "onChange",
      defaultValues: { preset: "" },
    });

  React.useEffect(() => {
    register("preset", { required: true });
  }, [register]);

  const [nextModifiedPreset, setNextModifiedPreset] =
    React.useState<string>("");

  const onSubmit: SubmitHandler<SidebarConnectCollapseFormInputs> = async (
    data
  ) => {
    if (currentRecord) {
      disconnect();
    }

    const { uri } = presets[data.preset];

    const result = await verifyURI(uri);

    queryClient.setQueriesData(["verifyURI", { uri }], result);

    if (result) {
      setURIStore((draft) => {
        draft.uri = uri;
      });

      setToast({
        text: "You are now connected to the database!",
        type: "success",
      });
    } else {
      setToast({
        text: "There was an error connecting to the database.",
        type: "error",
      });
    }
  };

  const handleAddPresetClick: React.MouseEventHandler<HTMLButtonElement> = (
    _e
  ) => {
    setNextModifiedPreset("");
    setVisible(true);
  };

  const handleModifyPresetClick: React.MouseEventHandler<HTMLButtonElement> = (
    _e
  ) => {
    const preset = getValues("preset");

    if (preset === "") {
      setToast({ text: "No preset was selected to modify.", type: "error" });
      return;
    }

    setNextModifiedPreset(preset);
    setVisible(true);
  };

  const handleSelectChange: (value: string | string[]) => void = (value) =>
    setValue("preset", value as string);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid.Container gap={2} direction="column">
          <Grid xs justify="center">
            <FieldContainer>
              <Text
                small
                type="secondary"
                style={{
                  display: "inline-flex",
                  margin: 0,
                  marginBottom: "10px",
                }}
              >
                Preset
              </Text>
              <Select
                value={watch("preset")}
                onChange={handleSelectChange}
                placeholder="Choose one"
              >
                {Object.keys(presets)
                  .filter((key) => !presets[key].deleted)
                  .map((key) => {
                    const preset = presets[key];

                    return (
                      <Select.Option key={key} value={key}>
                        <Dot
                          type={
                            preset.lastConnected === LastConnected.Indeterminate
                              ? "warning"
                              : preset.lastConnected === LastConnected.Failure
                              ? "error"
                              : "success"
                          }
                        >
                          <Text style={{ textTransform: "none" }} small>
                            {preset.name}
                          </Text>
                        </Dot>
                      </Select.Option>
                    );
                  })}
              </Select>
            </FieldContainer>
          </Grid>
          <Grid xs>
            <Button
              onClick={handleAddPresetClick}
              icon={<Plus />}
              style={{ width: "100%" }}
            >
              Add Preset
            </Button>
          </Grid>
          <Grid xs>
            <Button
              onClick={handleModifyPresetClick}
              disabled={Object.keys(presets).length === 0}
              type="secondary"
              icon={<Edit />}
              style={{ width: "100%" }}
            >
              Modify Preset
            </Button>
          </Grid>
          <Grid xs>
            <Button htmlType="submit" type="success" style={{ width: "100%" }}>
              Connect
            </Button>
          </Grid>
        </Grid.Container>
      </form>
      <AddEditPresetModal
        key={nextModifiedPreset}
        setValue={setValue}
        setVisible={setVisible}
        bindings={bindings}
        presetToModify={nextModifiedPreset}
      />
    </>
  );
};

export default SidebarConnectCollapseForm;
