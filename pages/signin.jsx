import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function Signin() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const user = supabase.auth.user();
  useEffect(() => {
    if (user) {
      return router.push("/");
    }
  }, [user, router]);

  const handleLogin = async () => {
    console.log("hi");
    console.log({ email, password });
    try {
      setLoading(true);
      const { user, session, error } = await supabase.auth.signIn({
        email,
        password,
      });
      if (error) throw error;
      alert("Successfully Logged In!");
      console.log(user);
    } catch (error) {
      console.log("Error in login: " + error);
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='signin' style={{ display: "flex" }}>
      <div className='design'>
        <Image src='/pic.svg' alt='Pic Logo' width={400} height={300} />
      </div>
      <div className='form'>
        <div className='form-control'>
          <h1 style={{ textDecoration: "underline" }}>Login</h1>
          <input
            id='email'
            type='text'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            id='pass'
            type='password'
            value={password}
            placeholder='Enter password'
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className='button-22' onClick={handleLogin}>
            Login
          </button>
          <br />
          <p className='login-subtext'>
            New User? <a href='./signup'>Signup</a>
          </p>
        </div>
      </div>
    </div>
  );
}

// import { useState, useEffect } from "react";
// import { supabase } from "../utils/supabaseClient";
// import Auth from "../components/Auth";
// import Account from "../components/Account";

// export default function Home() {
//   const [session, setSession] = useState(null);

//   useEffect(() => {
//     setSession(supabase.auth.session());
//     supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session);
//     });
//   }, []);

//   return (
//     <div className='container' style={{ padding: "50px 0px 100px 0px" }}>
//       {!session ? (
//         <Auth />
//       ) : (
//         <Account key={session.user.id} session={session} />
//       )}
//     </div>
//   );
// }
