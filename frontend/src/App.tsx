import React from "react";
import { GlobalStyles } from "./styles/global";
import { Router } from "./routes";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { StyledWrapper, StyledHeaderWrapper } from "./styles/Wrapper";

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledWrapper>
        <StyledHeaderWrapper>
          <Header />
        </StyledHeaderWrapper>
        <Router />
        <Footer />
      </StyledWrapper>
    </>
  );
}

export default App;
