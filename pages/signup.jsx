import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const router = useRouter();
  const user = supabase.auth.user();
  useEffect(() => {
    if (user) {
      return router.push("/");
    }
  }, [user, router]);

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("hi");
    if (!password1 || password1 !== password2) {
      return alert("Passwords doesn't match");
    }
    try {
      setLoading(true);
      const { user, session, error } = await supabase.auth.signUp(
        {
          email,
          password1,
        },
        { data: { name } }
      );
      if (error) throw error;
      alert("Successfully Signed UP In!");
      console.log(user);
    } catch (error) {
      console.log("Error in signup: " + error);
      console.log(error);
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className='signin'
      style={{
        display: "flex",
        position: "absolute",
        width: "100%",
        height: "100%",
      }}
    >
      <div className='design'>
        <Image src='/pic.svg' alt='Pic Logo' width={400} height={300} />
      </div>
      <form className='form' onSubmit={handleSignup}>
        <div className='form-control'>
          <h1 style={{ textDecoration: "underline" }}>Login</h1>
          <input
            id='name'
            type='text'
            placeholder='Enter Full Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            id='email'
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            id='pass1'
            type='password'
            value={password1}
            placeholder='Enter password'
            onChange={(e) => setPassword1(e.target.value)}
            required
          />
          <input
            id='pass2'
            type='password'
            value={password2}
            placeholder='Confirm password'
            onChange={(e) => setPassword2(e.target.value)}
            required
          />

          <button className='button-22'>Signup</button>
          <br />
          <p className='login-subtext'>
            Accoute Exists?{" "}
            <Link href='./signin'>
              <a>Sign In</a>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
