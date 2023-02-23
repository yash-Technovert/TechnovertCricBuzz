const initialState = {
  antiForgeryToken: "",
  accessToken: "",
  platform: "",
  signup_antiForgeryToken: "",
  form: "",
  email: "",
  firstName: "",
  mode: "light",
  language:"en"
};

export default function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "Bidyut":
      return {
        ...state,
        antiForgeryToken: payload.antiForgeryToken,
        email: payload.username,
        platform: payload.devicePlatform
          ? payload.devicePlatform.platform
          : "Microsoft Windows",
        form: "login",
      };
    
    default:
      return state;
  }
}
