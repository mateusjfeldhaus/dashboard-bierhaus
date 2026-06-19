import styled from "styled-components";

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100%;
`;

export const StyledHeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  background-color: #111111;
  border-bottom: 1px solid rgba(255, 208, 110, 0.15);
  display: flex;
  justify-content: center;
`;
