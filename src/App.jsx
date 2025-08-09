import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import PopNewCard from "./components/popups/PopNewCard/PopNewCard";
import PopBrowse from "./components/popups/PopBrowse/PopBrowse";
import PopUser from "./components/popups/PopUser/PopUser";
import { GlobalStyle, Wrapper } from "./App.styled";

function App() {
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <PopUser />
        <PopNewCard />
        <PopBrowse />
        <Header />
        <Main />
      </Wrapper>
    </>
  );
}

export default App;
