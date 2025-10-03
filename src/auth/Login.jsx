import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Contextpage from "../Contextpage";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { GoogleLogin } = useContext(Contextpage);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await GoogleLogin();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div
        className={`border-2 border-white/30 p-5 flex justify-center items-center gap-5 rounded-2xl cursor-pointer hover:bg-black transition-all duration-300 ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={!isLoading ? handleGoogleLogin : undefined}
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            <h1 className="text-white font-semibold">Signing in...</h1>
          </>
        ) : (
          <>
            <FcGoogle className="text-3xl" />
            <h1 className="text-white font-semibold">Sign in with Google</h1>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
