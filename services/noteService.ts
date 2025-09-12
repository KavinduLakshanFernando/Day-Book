import { auth, db } from "@/firebase";
import { Note } from "@/type/note";
import { addDoc, collection } from "firebase/firestore";

export const noteRef = collection(db, "notes");

export const saveNote = async (note: Note) => {
    try {
        const uId = auth.currentUser?.uid;
        const docRef = await addDoc(noteRef, { ...note, uId });
        return docRef;
    } catch (error) {
        console.log(error);
    }
}