import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../config/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const signUpAsync = createAsyncThunk(
  "userAccountSlice/signUp",
  async (payload) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      );
      await updateProfile(userCredentials.user, {
        displayName: payload.username,
      });
      return {
        name: userCredentials.user.displayName,
        email: userCredentials.user.email,
        userId: userCredentials.user.uid,
      };
    } catch (error) {
      console.log(error.message);
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        alert("Email already in use! Try another one!");
      } else {
        alert("Something went wrong! Try again!");
      }
    }
  }
);

const userAccountSlice = createSlice({
  name: "userAccount",
  initialState: {
    username: null,
    email: null,
    userId: null,
    isLoggedIn: false,
  },
  reducers: {
    signInCurrentUser(state, action) {
      if (action.payload.username) {
        state.username = action.payload.username;
      }
      state.email = action.payload.email;
      state.userId = action.payload.userId;
      state.isLoggedIn = true;
      state.status = "Signed in";
    },
    signOutCurrentUser(state, action) {
      state.username = null;
      state.email = null;
      state.userId = null;
      state.isLoggedIn = false;
      state.status = "Signed out";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpAsync.fulfilled, (state, action) => {
      state.username = action.payload.name;
      state.email = action.payload.email;
      state.userId = action.payload.userId;
      alert(
        `You've successfully created an account! \nName: ${action.payload.name} \nemail: ${action.payload.email}`
      );
    });
  },
});

//setters
export const { signInCurrentUser, signOutCurrentUser } =
  userAccountSlice.actions;

//getters
export const getUsername = (state) => state.currentUserAccount.username;
export const getUserEmail = (state) => state.currentUserAccount.email;
export const getUserId = (state) => state.currentUserAccount.userId;
export const getIsLoggedIn = (state) => state.currentUserAccount.isLoggedIn;
// methods to do sign in and sign up asynchronously

export { signUpAsync };

export default userAccountSlice.reducer;
