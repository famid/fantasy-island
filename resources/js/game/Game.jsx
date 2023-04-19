import GameScreen from "./screens/GameScreen";
import FoundationLayout from "./components/layout/FoundationLayout";

/**
 * Puzzle Game wrapper
 * @returns {JSX.Element}
 * @constructor
 */
function App({data}) {
  return (
    <FoundationLayout>
       <GameScreen data={data}/>

    </FoundationLayout>
  );
}

export default App;
