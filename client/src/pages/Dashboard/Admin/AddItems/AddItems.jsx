import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import ReusableForm from "../../../../components/ReusableForm/ReusableForm";
import axios from "axios";
import useMenu from "../../../../hooks/useMenu";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuthValue from "../../../../hooks/useAuthValue";
const image_hosting_key = import.meta.env.VITE_Cloudinary_Image_Hosting_key;
const AddItems = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuthValue()
  const [uploading, setUploading] = useState(false);
  const { refetch } = useMenu();
  const nav = useNavigate();
  const handleAddData = async (inputValues, reset) => {
    const formData = new FormData();
    const file = inputValues?.image[0];
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CloudImageUser);
    setUploading(true);
    try {
      const { data: cloud } = await axios.post(
        `https://api.cloudinary.com/v1_1/${image_hosting_key}/image/upload`,
        formData
      );

      if (!cloud.url) {
        Swal.fire({
          title: "Profile picture missing",
          text: "Please upload your profile image first.",
          icon: "warning",
        });
        return;
      }

      const { price, ...rest } = inputValues;
      rest.price = parseInt(price);
      rest.image = cloud?.url;

      const { data } = await axiosSecure.post(`/menu?email=${user?.email}`, rest);
      if (data?.insertedId) {
        reset();
        nav("/");
        refetch();
        Swal.fire({
          title: `${rest?.name} added Successfully`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Adding items failed ❌",
        text: err.message || "Something went wrong",
        icon: "error",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div>
        <SectionTitle heading={"ADD AN ITEM"} subHeading={"What's new?"} />
      </div>
      <div className="bg-[#F3F3F3] mt-5 flex justify-center items-center mx-4 md:mx-12 p-4 md:p-12 rounded-lg">
        <ReusableForm
          uploading={uploading}
          onSubmit={(data, reset) => {
            handleAddData(data, reset);
          }}
        ></ReusableForm>
      </div>
    </div>
  );
};

export default AddItems;
