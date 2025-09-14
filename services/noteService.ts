import { auth, db } from "@/firebase";
import { Note } from "@/type/note";
import { addDoc, collection, getDocs, orderBy, query, where } from "firebase/firestore";

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

export const fetchNotes = async (uId: string): Promise<Note[]> => {
    try {
        const fetchNoteByUserId = query(
            noteRef, 
            where("uId", "==", uId), 
            orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(fetchNoteByUserId);
        const notes: Note[] = querySnapshot.docs.map(doc => doc.data() as Note);
        return notes;
    } catch (error) {
        console.error("Error fetching notes:", error);
        return [];
    }
};