import React from 'react';
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
// import { signupUser } from './api';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDvxu8GHZw14CeBpXoZEh3hxDgyP5WfDLc",
    authDomain: "authmicroservice-867fa.firebaseapp.com",
    projectId: "authmicroservice-867fa",
    storageBucket: "authmicroservice-867fa.firebasestorage.app",
    messagingSenderId: "442060594474",
    appId: "1:442060594474:web:29d3c2597316c0135a9253",
    // measurementId: "G-B1CDH99LZQ"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const OAuthLogin = () => {
    const handleGoogleLogin = async () => {
        try {
            // const result = await signInWithPopup(auth, googleProvider);
            // const user = result.user;
            
        // const userData = {
        //     uid: user.uid,
        //     name: user.displayName,
        //     email: user.email,
        //     photoURL: user.photoURL,
        //     provider: 'google'
        // };
        //  const data = await signupUser(user.displayName, user.email, role, password);
        //         if (data?.message) {
        //             toast.success(data.message, {
        //                 position: "top-right",
        //                 autoClose: 3000,
        //                 style: { color: "white" }
        //             });
        //         }
        } catch (error) {
            console.error(error);
        }
    };

    const handleFacebookLogin = async () => {
        try {
            const result = await signInWithPopup(auth, facebookProvider);
            console.log(result.user);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <button className="google-btn" onClick={handleGoogleLogin}>
                <FaGoogle style={{ marginRight: '8px' }} /> Login with Google
            </button>

            <button className="facebook-btn" onClick={handleFacebookLogin}>
                <FaFacebookF style={{ marginRight: '8px' }} /> Login with Facebook
            </button>
        </div>
    );
};

export default OAuthLogin;