import { useState, useEffect, useRef, useContext } from "react";
import { set, useForm } from "react-hook-form";
import axios from "axios";
import LoadingSpinner from "../Components/LoadingSpinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getToken } from "../Utils/TokenUtils";
import ImageCropper from "../Components/ImageCropper";
import DefaultProfileImage from "../Components/DefaultProfileImage";
import { AuthContext } from "../Context/AuthProvider";
const API_URL = import.meta.env.VITE_API_URL;

export default function Profile() {
  const token = getToken();
  const { user, setUser } = useContext(AuthContext);
  const url = `${API_URL}/auth/me`;
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState(null);
  const [passwordError, setPasswordError] = useState("");
  const [userSelectedImage, setUserSelectedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const navigate = useNavigate();

  const imageFormRef = useRef(null);

  useEffect(() => {
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data.user);
        setUserData(res.data.user);
        setCroppedImage(res.data.user.profileImage);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  function handleChange(e) {
    setPasswordError("");
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  function onSubmit(data) {
    const updateUrl = `${API_URL}/users/${userData.id}`;
    // console.log(data);
    setPasswordError("");

    if (data.currentPassword.length > 0 || data.newPassword.length > 0 || data.confirmNewPassword.length > 0) {
      if (data.currentPassword.length == 0 || data.newPassword.length == 0 || data.confirmNewPassword.length == 0) {
        setPasswordError("Please enter your current password and a new password");
        return;
      }
      if (data.newPassword !== data.confirmNewPassword) {
        setPasswordError("Passwords dont match");
        return;
      }
    }

    setLoading(true);
    setUserData({ ...userData, currentPassword: "", newPassword: "", confirmNewPassword: "" });
    axios
      .put(
        updateUrl,
        {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          newPassword: data.newPassword,
          currentPassword: data.currentPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        if (res.data.message) {
          toast.error(res.data.message);
        } else {
          toast.success("Profile updated successfully");
        }
      })
      .catch((err) => toast.error(err.response.data.error))
      .finally(() => {
        setLoading(false);
        reset();
      });
  }

  function handleDelete(e) {
    document.getElementById("confirmPopup").showModal();
  }

  function deleteConfirmed() {
    const DeleteUrl = `${API_URL}/users/${userData.id}`;
    axios
      .delete(DeleteUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => toast.error(err.response.data.error))
      .finally(() => {
        toast.success("Account deleted successfully");
        navigate("/");
      });
  }

  function handleShowPassword(e) {
    e.preventDefault();
    setShowPassword(!showPassword);
  }

  function handleChangeImage(e) {
    // console.log(e.target.files[0]);
    setUserSelectedImage(URL.createObjectURL(e.target.files[0]));
    // console.log(URL.createObjectURL(e.target.files[0]));
    e.target.value = null;
  }

  function handleUpload(e) {
    e.preventDefault();
  }

  async function onCropComplete(croppedImg, croppedFile) {
    // console.log(croppedFile);
    imageFormRef.current.reset();
    setUserSelectedImage(null);
    if (!croppedImg) {
      setCroppedImage(null);
    } else {
      setCroppedImage(croppedImg);
      setUser({ ...user, profileImage: croppedImg });
      uploadImage(croppedFile);
    }
  }

  function uploadImage(image) {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);

    axios
      .post(`${API_URL}/upload-image-s3`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.imageUrl);
        // setUserData({ ...userData, profileImage: res.data.location });
      })
      .catch((err) => {
        console.log(err.message);
        toast.error(err.response.data.error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const windowMarkup = "min-h-screen border-[2px] border-solid border-base-content border-opacity-0 w-full m-auto text-left  px-12 my-4";

  if (loading)
    return (
      <div className={windowMarkup}>
        <LoadingSpinner />
      </div>
    );

  if (userData === null) return <div className="min-h-screen text-4xl flex items-center justify-center w-full">User doesn't exist</div>;

  return (
    <div className={windowMarkup}>
      <div className="max-w-[64rem] m-auto">
        <p className="text-2xl font-bold pt-12">My Settings</p>
        <div className="flex mt-8 gap-12 flex-wrap md:flex-nowrap">
          <div className="w-full md:w-[40%]">
            <p className="font-bold mt-2">Profile</p>
            <p className="text-xs">Your personal information and account security settings</p>
          </div>
          <div className="w-full md:w-[60%] flex flex-col gap-2 ">
            <p className="font-bold mt-2">Avatar</p>
            <div className="flex gap-4 my-2">
              {userSelectedImage ? (
                <div className="w-28 h-28">
                  <ImageCropper setUserSelectedImage={setUserSelectedImage} imageSrc={userSelectedImage} onCropComplete={onCropComplete} />
                </div>
              ) : croppedImage ? (
                <div>
                  <img className="rounded-full w-28 h-28 object-cover" src={croppedImage} alt="" />
                </div>
              ) : (
                <DefaultProfileImage size={5} />
              )}
              <form
                ref={imageFormRef}
                onSubmit={handleUpload}
                action="/upload-image"
                method="post"
                encType="multipart/form-data"
                className="flex gap-3">
                <div className="flex items-end mb-2 relative">
                  <label htmlFor="imageUpload" className="cursor-pointer">
                    <p className="hover:underline cursor-pointer">Upload Profile Image</p>
                    <input
                      id="imageUpload"
                      type="file"
                      name="image"
                      onChange={handleChangeImage}
                      className="hidden self-end text-sm text-info font-semibold hover:underline pb-2 w-40 hover:cursor-pointer"></input>
                  </label>

                  {/* <p className="hover:underline cursor-pointer" onClick={handleChangeImage}>
                    Upload Profile Image
                  </p> */}
                </div>
              </form>
            </div>
          </div>
        </div>

        <form className="" onSubmit={handleSubmit((data) => onSubmit(data))}>
          <div className="flex mt-8 gap-12 flex-wrap md:flex-nowrap">
            <div className="w-full md:w-[40%]"></div>
            <div className="w-full md:w-[60%] flex flex-col gap-2">
              {/* <p className="font-bold">Avatar</p> */}
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text font-semibold">First Name</span>
                </div>
                <input
                  value={userData.firstName}
                  {...register("firstName")}
                  type="text"
                  placeholder="Type here"
                  className={`input input-bordered`}
                  onChange={handleChange}
                />
              </label>
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text font-semibold">Last Name</span>
                </div>
                <input
                  value={userData.lastName}
                  {...register("lastName", { required: false })}
                  type="text"
                  placeholder="Type here"
                  className={`input input-bordered`}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>

          <div className="flex mt-8 gap-12 flex-wrap md:flex-nowrap">
            <div className="w-full md:w-[40%] pt-1">
              <p className="font-bold">Email address</p>
              <p className="text-xs">Your email is used to login into the platform</p>
            </div>
            <div className="w-full md:w-[60%] ">
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text font-semibold">Email</span>
                </div>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  autoComplete="off"
                  placeholder="Type here"
                  className={`input input-bordered`}
                  value={userData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-error font-semibold">Email is required.</p>}
              </label>
            </div>
          </div>

          <div className="flex mt-8 gap-12  flex-wrap md:flex-nowrap">
            <div className="w-full md:w-[40%]">
              <p className="font-bold mt-2">Set Password</p>
              <p className="text-xs">Choose a new password</p>
            </div>

            <div className="w-full md:w-[60%] flex flex-col gap-2">
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text font-semibold">Current password</span>
                </div>
                <div className="flex justify-between items-center relative">
                  <input
                    {...register("currentPassword", { required: false })}
                    onChange={handleChange}
                    id="currentPassword"
                    type={showPassword ? "text" : "password"}
                    autoComplete="off"
                    placeholder="Type here"
                    className={`input input-bordered w-full`}
                  />
                  <div className="absolute right-4 top-3">
                    <ShowPasswordButton handleShowPassword={handleShowPassword} showPassword={showPassword} />
                  </div>
                </div>
              </label>

              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text font-semibold">New password</span>
                </div>
                <div className="flex justify-between items-center relative">
                  <input
                    {...register("newPassword", { required: false })}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    placeholder="Type here"
                    className={`input input-bordered w-full`}
                  />
                  <div className="absolute right-4 top-3">
                    <ShowPasswordButton handleShowPassword={handleShowPassword} showPassword={showPassword} />
                  </div>
                </div>
              </label>

              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text font-semibold">Re-type new password</span>
                </div>
                <div className="flex justify-between items-center relative">
                  <input
                    {...register("confirmNewPassword", { required: false })}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    placeholder="Type here"
                    className={`input input-bordered w-full`}
                  />
                  <div className="absolute right-4 top-3">
                    <ShowPasswordButton handleShowPassword={handleShowPassword} showPassword={showPassword} />
                  </div>
                </div>
              </label>
              <p className="text-error font-semibold">{passwordError}</p>
            </div>
          </div>

          <div className="flex justify-end my-8 pb-12 ">
            <button type="submit" className="btn btn-info px-5 ">
              Save Settings
            </button>
          </div>
        </form>
        {userData.role != "staff" && (
          <>
            <div className="border-[2px] border-base-content "></div>
            <p className="font-bold mt-8">Delete account</p>
            <p className="text-xs">You can't re-activate your account again. It wil delete your account permanantly.</p>
            <div className="flex justify-end my-12">
              <button onClick={handleDelete} className="btn bg-red-500 text-white">
                Delete Account
              </button>
            </div>
          </>
        )}
      </div>
      <ConfirmPopup deleteConfirmed={deleteConfirmed} />
    </div>
  );
}

const ConfirmPopup = ({ deleteConfirmed }) => {
  return (
    <dialog id="confirmPopup" className="modal">
      <div className="modal-box bg-base-100">
        <h3 className="font-bold text-lg">Confirmation</h3>
        <p className="py-4 font-semibold">Are you sure you want to permanantly delete your account?</p>
        <div className="modal-action">
          <form method="dialog" className="flex justify-between w-full">
            {/* if there is a button in form, it will close the modal */}
            <button onClick={deleteConfirmed} className="btn btn-outline btn-error">
              Confirm
            </button>
            <button className="btn btn-outline">Cancel</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

const ShowPasswordButton = ({ handleShowPassword, showPassword }) => {
  return (
    <button className="" onClick={handleShowPassword}>
      {!showPassword ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
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
  );
};

// function ImageCropper({ imageSrc }) {
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);

//   return <Cropper image={imageSrc} crop={crop} zoom={zoom} aspect={1} cropShape="round" onCropChange={setCrop} onZoomChange={setZoom} />;
// }
