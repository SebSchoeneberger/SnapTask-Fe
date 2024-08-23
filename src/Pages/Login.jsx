import { useForm } from "react-hook-form";
import { AuthContext } from "../Context/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import image1 from "../assets/7178573_61336.svg";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

function Login() {


    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const [authError, setAuthError] = useState("");

    const onSubmit = async (data) => {
        setIsLoading(true);
        setAuthError("");
    
        try {
            const loggedInUser = await login(data);

            if (loggedInUser.role === 'admin') {
                navigate('/dashboard');
            } else if (loggedInUser.role === 'staff') {
                navigate('/staff/areas');
            } else {
                navigate('/');
            }

            toast.success('Login Successful. Enjoy Snaptask!');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setAuthError("Email or Password is incorrect"); 
            } else {
                console.error(error);
            } 
        } finally {
            setIsLoading(false);
        }
    };

    return ( 
        <div className="flex items-center justify-center min-h-screen">

           <div className="border p-8 flex flex-col justify-center items-center">

            <img className="h-40 w-auto" src={image1} alt="QR code Picture" />
            <h1 className="text-2xl p-3">Login to SnapTask!</h1>
            <p className="pb-3">Don't have an account yet? <Link to="/signup" className="text-blue-500 underline hover:text-blue-700">Sign up here</Link> </p>

            <button className="btn btn-wide">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
                <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>

                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </button>
          </label>
          {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
          {authError && <p style={{ color: "red" }}>{authError}</p>}

          <Link className="text-sm hover:text-blue-500 hover:underline">Forgot Password?</Link>

          <button type="submit" className="btn" disabled={isLoading}>
            {isLoading ? <span className="loading loading-dots loading-md"></span> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
