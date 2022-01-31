import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signInWithPopup, signOut } from "firebase/auth";
import { PizzaSizesType } from "../../components/RadioPizzaSize/Index";
import { auth, facebookProvider, googleProvider, twitterProvider } from "../../config/firebase";
import { RootState } from "../../store";

export interface UserDataType {
  bag: { productId: string; size: PizzaSizesType; quantity: number }[];
}

export interface AuthUserType {
  id: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthType {
  user: AuthUserType | null;
  isOpenModal: boolean;
  loading: boolean;
  error: string | null;
}

export const signInWithTwitter = createAsyncThunk("auth/signInTwitterStatus", async state => {
  const result = await signInWithPopup(auth, twitterProvider);
  const user = result.user;
  return user;
});
export const signInWithGoogle = createAsyncThunk("auth/signInGoogleStatus", async state => {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;
  return user;
});
export const signInWithFacebook = createAsyncThunk("auth/signInFacebookStatus", async state => {
  const result = await signInWithPopup(auth, facebookProvider);
  const user = result.user;
  return user;
});

export const signOutUser = createAsyncThunk("auth/signOutStatus", async state => {
  return await signOut(auth);
});

let initialState: AuthType = { user: null, isOpenModal: false, loading: false, error: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUserType | null>) => {
      state.user = action.payload;
    },
    openAuthModal: state => {
      state.isOpenModal = true;
    },
    closeAuthModal: state => {
      state.isOpenModal = false;
    }
  },
  extraReducers: builder => {
    //Google Authentication
    builder.addCase(signInWithGoogle.pending, state => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(signInWithGoogle.fulfilled, (state, action) => {
      const user = {
        id: action.payload.uid,
        email: action.payload.email,
        displayName: action.payload.displayName,
        photoURL: action.payload.photoURL
      };

      state.user = user;
      state.isOpenModal = false;
      state.loading = false;
    });

    builder.addCase(signInWithGoogle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
      console.log(action.error);
    });

    //Facebook Authentication
    builder.addCase(signInWithFacebook.pending, state => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(signInWithFacebook.fulfilled, (state, action) => {
      const user = {
        id: action.payload.uid,
        email: action.payload.email,
        displayName: action.payload.displayName,
        photoURL: action.payload.photoURL
      };

      state.user = user;
      state.isOpenModal = false;
      state.loading = false;
    });

    builder.addCase(signInWithFacebook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
      console.log(action.error);
    });

    //Sign out
    builder.addCase(signOutUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = null;
    });
  }
});

export const selectAuthIsOpenModal = (state: RootState) => state.auth.isOpenModal;
export const selectAuthUser = (state: RootState) => state.auth.user;

export const { setUser, openAuthModal, closeAuthModal } = authSlice.actions;

export default authSlice.reducer;
