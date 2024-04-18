import { actionType, initialType } from "./sign-up";

export const initialState:initialType = {
  matric: "",
  image: "",
  password: "",
}

export const reducer = (state:initialType, action:actionType):initialType => {
  switch (action.type) {
    case "ALL":
      return {...initialState};
    case "MATRIC_":
      const holdMatric = action.payload.length;
      if ((holdMatric < 8) && (holdMatric !== 0)) {
        document.querySelector("#matricNum")!.ariaInvalid = "true";
        return {
          ...state,
          matric: action.payload.trim().toLowerCase(),
          matN_message: "Matric number should be minimum of 8",
        };
      }
      document.querySelector("#matricNum")!.ariaInvalid = "false";
      return {
        ...state,
        matric: action.payload.trim().toUpperCase(),
        matN_message: "",
      };
    case "IMAGE":
      const holdImg = action.payload;
      const lenImg = holdImg.length;
      const strImg = holdImg.substring((lenImg-4));
      const arrVal = /(.jpeg|.png)/g.test(strImg);
      if (arrVal) {
        return {
          ...state,
          image: action.payload,
        } 
      } else {
        return {
          ...state,
          image: "",
        }
      }
    case "PASSWORD":
      const holdVal = action.payload.length;
      if ((holdVal < 8) && (holdVal !== 0)) {
        document.querySelector("#password")!.ariaInvalid = "true";
        return {
          ...state,
          password: action.payload.trim(),
          pwd_message: "Enter minimum of 8 digits",
        };
      }
      document.querySelector("#password")!.ariaInvalid = "false";
      return {
        ...state,
        password: action.payload.trim(),
        pwd_message: "",
      };

    default:
      // wysiwyg... all state maintained
      return {...state};
  }
}