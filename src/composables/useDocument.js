import {ref} from 'vue';
import {projectFirestore} from '../firebase/config';

const useDocument = (collection, id) => {
    const error = ref(null)
    const isPending = ref(false)


  // Select Document by ID
  let docRef = projectFirestore.collection(collection).doc(id)

  // Delete selected Document
  const deleteDoc = async () => {
    isPending.value = true
    error.value = null

    try {
      const res = await docRef.delete()
      isPending.value = false
      return res
    }
    catch(err) {
      console.log(err.message)
      isPending.value = false
      error.value = 'could not delete the document'
    }
  }

    // Update selected Document
    const updateDoc = async (updates) => {
        isPending.value = true
        error.value = null

        try {
            const res = await docRef.update(updates)
            return res
        } catch (err) {
            console.log(err.message)
            isPending.value = false
            error.value = err.message;
        }
    }



    return {
        error,
        isPending,
        deleteDoc,
        updateDoc
    }
}


export default useDocument