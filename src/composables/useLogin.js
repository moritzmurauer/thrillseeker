

import { ref } from 'vue';
import { projectAuth } from '../firebase/config';

// refs & signup outside of exported function
const error = ref(null);
const isPending = ref(false)


// Log in User and create possible error outputs
const login = async (email, password) => {
    error.value = null
    isPending.value = true

    try {
        const res = await projectAuth.signInWithEmailAndPassword(email, password)
        error.value = null
        isPending.value = false

        console.log(res);
        return res

    } catch (err) {
        console.log(err.message)
        error.value = err.message;
        isPending.value = false
    }

}


const useLogin = () => {
    return {error, login, isPending}
}

export default useLogin