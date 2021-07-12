import styled from "styled-components";

export type VisibleProps = {
  visible: boolean;
};

const Visible = styled.div<VisibleProps>`
  display: ${(props) => (!props.visible ? "none" : "block")};
`;

export default Visible;
