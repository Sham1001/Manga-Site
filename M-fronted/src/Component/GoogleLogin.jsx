import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase'; // This import will now work!

const SignInButton = () => {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      console.log("Signed in with Google!");
      // Handle successful sign-in (e.g., redirect user)
    } catch (error) {
      console.error("Error signing in with Google", error);
      // Handle errors here
    }
  };

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  );
};

export default SignInButton;
