import { Link, useNavigate } from "react-router-dom";

function Home() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen w-full flex flex-col justify-evenly items-center">
      <h1 className="flex justify-center items-center text-5xl ">Home</h1>
      <div className="flex gap-4">
        <button
          onClick={() => nav("login")}
          className="btn btn-primary rounded-2xl"
        >
          Login
        </button>
        <button onClick={() => nav("signup")} className="btn btn-secondary">
          Sign up
        </button>
      </div>
    </div>
  );
}

export default Home;
