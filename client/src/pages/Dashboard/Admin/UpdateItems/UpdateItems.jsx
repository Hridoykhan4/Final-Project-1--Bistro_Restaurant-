    import { useNavigate, useParams } from "react-router-dom";
    import { useQuery } from "@tanstack/react-query";
    import { useForm } from "react-hook-form";
    import { FaUtensils } from "react-icons/fa";
    import Swal from "sweetalert2";
    import useAxiosSecure from "../../../../hooks/useAxiosSecure";
    import useAxiosPublic from "../../../../hooks/useAxiosPublic";
    import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
    import ReusableForm from "../../../../components/ReusableForm/ReusableForm";
    const UpdateItems = () => {
    const { register, handleSubmit } = useForm();

    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const nav = useNavigate();
    const axiosPublic = useAxiosPublic();
    const {
        data: item = {},
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["recipe", id],
        queryFn: async () => {
        const { data } = await axiosSecure(`/menu/${id}`);
        return data;
        },
        staleTime: 0,
    });

    const handleUpdate = (data, ) => {
        console.log(data);
      
    }

    /* const onSubmit = async ({ price, image, ...rest }) => {
        if (!image || image.length === 0) {
        console.log("No image selected");
        return;
        }

        const imageFile = { image: image[0] };
        const { data: imgBBData } = await axiosPublic.post(
        `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMAGE_HOSTING_KEY
        }`,
        imageFile,
        {
            headers: {
            "content-type": "multipart/form-data",
            },
        }
        );

        if (imgBBData?.success) {
        try {
            const { data } = await axiosSecure.patch(`/menu/${id}`, {
            ...rest,
            price: parseFloat(price),
            image: imgBBData.data.display_url,
            });
            if (data?.modifiedCount) {
            Swal.fire({
                title: `${rest?.name} updated Successfully`,
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
            });
            refetch();
            nav(`/dashboard/manageItems`);
            }
        } catch (err) {
            console.log(err);
        }
        }
    };
    */
    if (isLoading) return <p>Loading</p>;

    return (
      <div>
        <SectionTitle heading={"Update Item"} subHeading={"Wanna Change?"} />
        <div className="bg-[#F3F3F3] flex justify-center items-center mx-4 md:mx-12 p-4 md:p-12 rounded-lg">
          <ReusableForm
          onSubmit={(data) => handleUpdate(data)}
            defaultValues={{
              name: item?.name,
              category: item?.category,
              price: item?.price,
              recipe: item?.recipe,
            }}
            buttonLabel="Update Item"
          ></ReusableForm>
        </div>
      </div>
    );
    };

    export default UpdateItems;
