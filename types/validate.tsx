import { actionType, initialType } from "./sign-up";

export const initialState:initialType = {
  matric: "",
  image: "",
  password: "",
  postalName: "",
}

export const reducer = (state:initialType, action:actionType):initialType => {
  switch (action.type) {
    case "ALL":
      return {...initialState};
    case "MATRIC_":
      const holdMatric = action.payload.length;
      const holdMatricReg = /^[0-9]{2}(?:\/[0-9]{2}[a-z\d]+)+$/i.test(action.payload);
      if ((holdMatric < 8) && (holdMatric !== 0)) {
        document.querySelector("#matricNum")!.ariaInvalid = "true";
        return {
          ...state,
          matric: action.payload.trim().toLowerCase(),
          matN_message: "Be at least 8 characters long, example: 19/52HL001",
        };
      } else if (holdMatricReg === false && (holdMatric !== 0)) {
        document.querySelector("#matricNum")!.ariaInvalid = "true";
        return {
          ...state,
          matric: action.payload.trim().toLowerCase(),
          matN_message: "Characters should follow like this sequence, example: 19/52HL001",
        };
      }
      document.querySelector("#matricNum")!.ariaInvalid = "false";
      return {
        ...state,
        matric: action.payload.trim().toUpperCase(),
        matN_message: "",
      };
    case "NICKNAME":
      const holdNickname = action.payload.length;
      const holdNicknameReg = /^[A-Za-z0-9]+$/g.test(action.payload);
      if ((holdNickname < 2) && holdNickname !== 0) {
        document.querySelector("#postalName")!.ariaInvalid = "true";
        return {
          ...state,
          postalName: action.payload.trim(),
          postalNameMsg: "Be at least 2 characters long",
        };
      } else if (holdNicknameReg === false && (holdNickname !== 0)) {
        document.querySelector("#postalName")!.ariaInvalid = "true";
        return {
          ...state,
          postalName: action.payload.trim(),
          postalNameMsg: "Characters should be alphabetic or numeric",
        };
      }
      document.querySelector("#postalName")!.ariaInvalid = "false";
      return {
        ...state,
        postalName: action.payload.trim(),
        postalNameMsg: "",
      };
    case "IMAGE":
      const holdImg = action.payload;
      const arrVal1 = holdImg.endsWith(".png");
      const arrVal2 = holdImg.endsWith(".jpeg");
      const arrVal3 = holdImg.endsWith(".jpg");
      if (arrVal1 || arrVal2 || arrVal3) {
        document.querySelector("#userImage")!.ariaInvalid = "false";
        return {
          ...state,
          image: action.payload,
          userImgMsg: ""
        } 
      } else {
        document.querySelector("#userImage")!.ariaInvalid = "true";
        return {
          ...state,
          image: "",
          userImgMsg: "Either insert passport with .png, .jpeg or .jpg file extension"
        }
      }
    case "PASSWORD":
      const holdVal = action.payload.length;
      if ((holdVal < 8) && (holdVal !== 0)) {
        document.querySelector("#password")!.ariaInvalid = "true";
        return {
          ...state,
          password: action.payload.trim(),
          pwd_message: "Be at least 8 characters long"
        };
      }
      document.querySelector("#password")!.ariaInvalid = "false";
      return {
        ...state,
        password: action.payload.trim(),
        pwd_message: ""
      };

    default:
      // wysiwyg... all state maintained
      return {...state};
  }
}