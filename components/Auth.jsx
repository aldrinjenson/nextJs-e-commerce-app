import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import "./signin.css";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (email) => {
    try {
      setLoading(true);
      const { user, session, error } = await supabase.auth.signIn({
        email,
        password,
      });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div classNameName='signin'>
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

          <button className='button-22' role='button'>
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
