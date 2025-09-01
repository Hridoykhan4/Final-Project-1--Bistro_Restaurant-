import { FcGoogle } from "react-icons/fc";
import useAuthValue from "../../hooks/useAuthValue";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const GoogleLoginButton = ({from}) => {
  const { googleSignIn, setUser, user } = useAuthValue();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await googleSignIn();
      setUser({
        ...result,
        name: result?.user?.displayName,
        image: result?.user?.photoURL,
      });
      Swal.fire({
        title: "Welcome 🎉",
        text: `Logged in as ${user?.displayName || result.user?.email}`,
        icon: "success",
        background: "#ecfdf5",
        color: "#065f46",
        confirmButtonColor: "#10b981",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate(from);
    } catch (err) {
      Swal.fire({
        title: "Google Sign-In Failed",
        text: err.message || "Something went wrong.",
        icon: "error",
        background: "#fef2f2",
        color: "#7f1d1d",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full cursor-pointer flex items-center justify-center gap-3 px-4 py-2 border rounded-lg shadow-sm hover:shadow-md transition bg-white text-gray-700 font-medium"
    >
      <FcGoogle className="text-xl" />
      Continue with Google
    </button>
  );
};

export default GoogleLoginButton;
