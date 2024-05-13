import { useNavigate } from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayout";

function CourseCard({ data }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/course/description", { state: { ...data } })}
      className="text-white w-[22rem] h-[430] shadow-lg rounded-lg cursor-pointer group overflow-hiddenbg-zinc-700"
    >
      <div className="overflow-hidden">
        <img
          className="h-48 w-full rounded-tr-lg rounded-tl-lg group-hover:scale-[1,2] transition-all ease-out duration-300"
          src={data?.thumbnails?.secure_url}
          alt="course thumbnail"
        />
        <div className="p-3 space-y-1 text-white">
          <h2 className="text-xl font-bold text-yellow-500 line-clamp-2">
            {data?.tittle}
          </h2>
          <p className="line-clamp-2">{data?.description}</p>
          <p className="font-semibold">
            <span className="text-yellow-500 font-bold">Category</span>

            {data?.category}
          </p>

          <p className="font-semibold">
            <span className="text-yellow-500 font-bold">Total Lectures</span>

            {data?.numberOfLectures}
          </p>

          <p className="font-semibold">
            <span className="text-yellow-500 font-bold">Created By</span>

            {data?.createdBy}
          </p>
        </div>
      </div>
    </div>
  );
}
export default CourseCard;
