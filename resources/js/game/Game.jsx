import GameScreen from "./screens/GameScreen";
import {Navigate, Route, Routes} from "react-router-dom";
import SelectSize from "./screens/SelectSize";
import FoundationLayout from "./components/layout/FoundationLayout";

/**
 * Puzzle Game wrapper
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
  return (
    <FoundationLayout>
       <GameScreen />
       {/* <SelectSize /> */}

    </FoundationLayout>
  );
}

export default App;
