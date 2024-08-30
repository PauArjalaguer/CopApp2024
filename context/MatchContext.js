import React, { useState, createContext} from 'react';

const MatchContext = createContext([{}, () => {}]);

const MatchProvider = (props) => {
  const [state, setState] = useState({});
  return (
    <MatchContext.Provider value={[state, setState]}>
      {props.children}
    </MatchContext.Provider>
  );
}

export { MatchContext, MatchProvider };