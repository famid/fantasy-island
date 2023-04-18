import GameScreen from "./screens/GameScreen";
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

    </FoundationLayout>
  );
}

export default App;
