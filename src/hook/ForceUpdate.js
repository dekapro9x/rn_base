import {useState} from 'react';
function useForceUpdate() {
  const [state, setState] = useState(false);
  return () => setState(!state);
}
export {useForceUpdate};
