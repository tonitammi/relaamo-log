import type { User } from "firebase/auth";
import { get } from "svelte/store";
import { user } from "../../scripts/stores";
import { auth } from "../../scripts/firebase"
import { signInWithEmailAndPassword, onAuthStateChanged, signOut as signOutFb } from "firebase/auth";

export const getAuthListener = (cb: (u: User | null) => void) => {
  return onAuthStateChanged(auth, (user) => {
    cb(user);
  });
}

export const signIn = async (email: string, password: string) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    return { user: credentials.user, error: null }
  }
  catch(err) {
    return { user: null, error: err as Error }
  }
}

export const signOut = () => {
  signOutFb(auth)
  user.set(null);
}

export const hasWriteAccess = (userCredentials: User | null) => {
  const readUsers = ["5p5JXU2jVEXQSxAhizcd2sqI3S62"];

  if(!userCredentials) {
    return false;
  }
  if(readUsers.includes(userCredentials.uid)) {
    return false;
  }

  return true;
}