import { auth } from "@/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword } from "firebase/auth"

export const register =  (email: string, password: string, name: string) => {
    return createUserWithEmailAndPassword(auth, email, password);

}

export const login =  (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const changePassword = async (newPassword: string) => {
  const user = auth.currentUser;
  if (user) {
    return await updatePassword(user, newPassword);
  }
  throw new Error("No user is currently signed in.");
};

export const logout = () => {
    return auth.signOut();
}