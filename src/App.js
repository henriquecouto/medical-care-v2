import React, { useState } from "react";
import Assistant from "./Assistant";

function App() {
  const [speechActive, setSpeechActive] = useState(false);

  return (
    <Assistant lang="pt-BR" active={speechActive}>
      <button onClick={() => setSpeechActive(true)}>Ativar assistente</button>
    </Assistant>
  );
}

export default App;
