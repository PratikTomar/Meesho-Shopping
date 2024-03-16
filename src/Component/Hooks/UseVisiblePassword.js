import { useState } from "react";

const UseVisiblePassword = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const passwordShowHandler = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return [isPasswordVisible, passwordShowHandler];
};

export default UseVisiblePassword;
