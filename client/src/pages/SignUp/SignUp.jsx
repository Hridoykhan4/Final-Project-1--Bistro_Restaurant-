import { Helmet } from "react-helmet-async";
import loginImg from "../../assets/others/authentication.gif";
import useAuthValue from "../../hooks/useAuthValue";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import GoogleLoginButton from "../../components/Auth/GoogleLoginButton";
import { FcUp } from "react-icons/fc";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
// eslint-disable-next-line no-unused-vars
import { easeInOut, motion } from "framer-motion";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const nav = useNavigate();
  const { createUser, updateUserProfile } = useAuthValue();
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState("");

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return;
    if (!file?.type?.startsWith("image/")) {
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Bisto-user");
    setUploading(true);
    try {
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/djujnfiwa/image/upload",
        formData
      );
      setImageURL(data.url);
      Swal.fire({
        title: "Uploaded ✅",
        text: "Profile picture uploaded successfully!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        background: "#ecfdf5",
        color: "#065f46",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Upload failed ❌",
        text: "Something went wrong. Try again.",
        icon: "error",
        background: "#fef2f2",
        color: "#7f1d1d",
      });
    } finally {
      setUploading(false);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!imageURL) {
      Swal.fire({
        title: "Profile picture missing",
        text: "Please upload your profile image first.",
        icon: "warning",
        background: "#fef9c3",
        color: "#854d0e",
      });
      return;
    }

    try {
      await createUser(data.email, data.password);
      await updateUserProfile(data.name, imageURL);

      // user entry in DB
      const userInfo = {
        name: data.name,
        email: data.email,
      };
      const res = await axiosPublic.post("/users", userInfo);
      if (res?.data?.insertedId) {
        console.log("added in DB");
        Swal.fire({
          title: "Welcome 🎉",
          text: `Account created for ${data.email}`,
          icon: "success",
          background: "#ecfdf5",
          color: "#065f46",
          timer: 2000,
          showConfirmButton: false,
        });
        reset();
        setFile(null);
        setImageURL("");
        nav("/");
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Registration failed ❌",
        text: err.message || "Something went wrong",
        icon: "error",
        background: "#fef2f2",
        color: "#7f1d1d",
      });
    }
  };

  return (
    <motion.section
      className="overflow-hidden"
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3, ease: easeInOut, duration: 1 }}
    >
      <Helmet>
        <title>Bistro Boss - Register</title>
      </Helmet>

      <div className="hero min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="hero-content flex-col lg:flex-row-reverse gap-10">
          {/* Image Side */}
          <div className="hidden lg:flex justify-center items-center w-1/2">
            <img
              src={loginImg}
              alt="Sign Up"
              className="rounded-xl shadow-xl max-h-[450px] object-cover"
            />
          </div>

          {/* Form Side */}
          <div className="card w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
              Create Account
            </h2>
            <p className="text-center text-gray-500 mb-6">
              Sign up to start your journey with{" "}
              <span className="font-semibold text-gray-700">Bistro Boss</span>
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 4,
                      message: "Name must be at least 4 characters",
                    },
                  })}
                  className="input input-bordered w-full rounded-lg"
                />
                {errors.name && (
                  <span className="text-red-600 text-xs">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  className="input input-bordered w-full rounded-lg"
                />
                {errors.email && (
                  <span className="text-red-600 text-xs">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "At least 6 characters" },
                    maxLength: {
                      value: 20,
                      message: "No more than 20 characters",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                      message:
                        "Password must contain 1 uppercase, 1 lowercase, and 1 number",
                    },
                  })}
                  className="input input-bordered w-full rounded-lg"
                />
                {errors.password && (
                  <span className="text-red-600 text-xs">
                    {errors.password.message}
                  </span>
                )}
              </div>

              {/* Profile Picture */}
              <div>
                <input
                  id="fileInput"
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer flex flex-col items-center text-gray-600 mb-2"
                >
                  <FcUp className="text-3xl mb-1" />
                  <span>{file ? file.name : "Choose profile picture"}</span>
                </label>
                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={!file || uploading}
                  className={`w-full py-2 rounded-lg text-white font-medium ${
                    !file || uploading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {uploading ? "Uploading..." : "Upload Profile Picture"}
                </button>
              </div>

              {/* Submit */}
              <input
                type="submit"
                className="btn btn-neutral w-full mt-4"
                value="Sign Up"
              />
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <hr className="flex-grow border-gray-300" />
              <span className="px-3 text-gray-500 text-sm">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Google Sign-In */}
            <GoogleLoginButton />

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="link text-blue-600 font-medium">
                  Login Now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default SignUp;
