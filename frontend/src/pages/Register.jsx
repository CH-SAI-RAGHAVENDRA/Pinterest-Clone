import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { LoadingAnimation } from "../components/Loading";
import { PinData } from "../context/PinContext";

const Register = () => {
  const [name,setName]=useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { registerUser, btnLoading } = UserData();
  const {fetchPins}=PinData();
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    registerUser(name,email, password, navigate,fetchPins);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Pinterest-logo.png/600px-Pinterest-logo.png"
            alt="Pinterest"
            className="h-12"
          ></img>
        </div>
        <h2 className="text-2xl font-semibold text-center mb-6">
          Register to pinterest
        </h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="common-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="common-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="common-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="common-btn" disabled={btnLoading}>
            {btnLoading ? <LoadingAnimation /> : "Register"}
          </button>
        </form>
        <div className="mt-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-2 bg-white px-2 text-sm text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="mt-4 text-center text-sm">
          <span>
            Already have an account?
            <Link
              to="/login"
              className="ml-1 font-semibold text-pinterest hover:underline"
            >
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
