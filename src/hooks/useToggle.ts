import {useState} from 'react';

const useToggle = (defaultOn: boolean) => {
  const [isOn, setIsOn] = useState(defaultOn);

  const toggle = () => {
    setIsOn((actualOn) => !actualOn);
  };

  return {
    on: isOn,
    toggle,
  };
};

export default useToggle;
