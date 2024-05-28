import screenshot from "./assets/sample.png";

import "./util/styleUtils";
import "./App.css";
import { Button } from "@loomhq/lens";

function App() {
  return (
    <div>
      <Button>Button</Button>
      <img className="base-img" src={screenshot} alt="screenshot" />
    </div>
  );
}

export default App;
