import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import { createNewCourse } from "../../Redux/Slices/courseSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import { AiOutlineArrowLeft } from "react-icons/ai";

function CreateCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    title: "",
    category: "",
    createdBy: "",
    description: "",
    thumbnails: null, // Use null instead of "null"
    previewImage: "",
  });

  function handleImageUpload(e) {
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.onload = () => {
        setUserInput((prev) => ({
          ...prev,
          previewImage: fileReader.result,
          thumbnails: uploadedImage,
        }));
      };
    }
  }

  function handleUserInput(e) {
    const { name, value } = e.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (
      !userInput.title ||
      !userInput.category ||
      !userInput.createdBy ||
      !userInput.description ||
      !userInput.thumbnails
    ) {
      toast.error("All fields are mandatory");
      return;
    }
    const response = await dispatch(createNewCourse(userInput));
    if (response?.payload?.success) {
      setUserInput({
        title: "",
        category: "",
        createdBy: "",
        description: "",
        thumbnails: null,
        previewImage: "",
      });
      navigate("/courses");
    }
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[90vh]">
        <form
          noValidate
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative"
        >
          <Link
            to="/previous-page"
            className="absolute top-5 text-2xl link text-accent cursor-pointer"
          >
            <AiOutlineArrowLeft />
          </Link>
          <h1 className="text-center text-2xl font-bold ">Create New Course</h1>
          <main className="grid grid-cols-2 gap-x-10">
            <div className="gap-y-6">
              <div>
                <label htmlFor="image_uploads" className="cursor-pointer">
                  {userInput.previewImage ? (
                    <img
                      className="w-full h-44 m-auto border"
                      src={userInput.previewImage}
                      alt="Course Thumbnail"
                    />
                  ) : (
                    <div className="w-full h-44 m-auto flex items-center justify-center border">
                      <h1 className="font-bold text-lg">
                        Upload Your Course Thumbnails
                      </h1>
                    </div>
                  )}
                </label>
                <input
                  className="hidden"
                  type="file"
                  id="image_uploads"
                  accept=".jpg, .jpeg, .png"
                  name="image_uploads"
                  onChange={handleImageUpload}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="title" className="text-lg font-semibold">
                  Course title
                </label>
                <input
                  required
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter your Course title"
                  className="bg-transparent px-2 py-1 border"
                  value={userInput.title}
                  onChange={handleUserInput}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-1">
                <label htmlFor="createdBy" className="text-lg font-semibold">
                  Course Instructor
                </label>
                <input
                  required
                  type="text"
                  name="createdBy"
                  id="createdBy"
                  placeholder="Enter your Course instructor"
                  className="bg-transparent px-2 py-1 border"
                  value={userInput.createdBy}
                  onChange={handleUserInput}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="category" className="text-lg font-semibold">
                  Course category
                </label>
                <input
                  required
                  type="text"
                  name="category"
                  id="category"
                  placeholder="Enter your Course category"
                  className="bg-transparent px-2 py-1 border"
                  value={userInput.category}
                  onChange={handleUserInput}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="description" className="text-lg font-semibold">
                  Course description
                </label>
                <textarea
                  required
                  name="description"
                  id="description"
                  placeholder="Enter your Course description"
                  className="bg-transparent px-2 py-1 border h-24 overflow-y-scroll resize-none"
                  value={userInput.description}
                  onChange={handleUserInput}
                />
              </div>
            </div>
          </main>
          <button className="w-full py-2 rounded-sm font-semibold text-lg cursor-pointer bg-yellow-600 hover:bg-yellow-400 transition-all ease-in-out">
            Create Course
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default CreateCourse;
