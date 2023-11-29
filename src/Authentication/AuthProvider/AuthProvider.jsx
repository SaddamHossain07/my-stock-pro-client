import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth"
import { app } from "../config/firebase.config";
import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";
export const AuthContext = createContext(null)

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic()

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        return signOut(auth)
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            if (currentUser) {
                // do some thing 
                const userInfo = { email: currentUser.email }
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('accessToken', res.data.token)
                            setLoading(false)
                        }
                    })
            } else {
                // do something 
                localStorage.removeItem('accessToken')
                setLoading(false)
            }
        })
        return () => {
            return unsubscribe
        }
    }, [axiosPublic])

    const authInfo = {
        user,
        loading,
        createUser,
        loginUser,
        googleLogin,
        updateUserProfile,
        logOut,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;