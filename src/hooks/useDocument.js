import {useEffect, useState} from "react";
import {projectFirestore} from "../firebase/config";

export const useDocument = (collection, id) => {
  const [document, setDocument] = useState("");
  const [error, setError] = useState(null);

  // realtime data for documents
  useEffect(() => {
    const ref = projectFirestore.collection(collection).doc(id)
    const unsubscribe = ref.onSnapshot(snapshot => {
      if (snapshot.data()) {
        setDocument({...snapshot.data(), id: snapshot.id})
        setError(null)
      } else {
        setError("No such document found")
      }
    }, err => {
      console.log(err.message)
      setError("Failed to get document")
    })

    return () => unsubscribe()

  }, [collection, id])

  return { document, error }
}