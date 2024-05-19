import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../Redux/Slices/courseSlice";
import { useEffect } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import CourseCard from "../../Components/CourseCard";

function CourseList() {
  const dispatch = useDispatch();

  const { courseData, loading, error } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  if (loading) {
    return (
      <HomeLayout>
        <div className="min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white">
          <h1 className="text-center text-3xl font-semibold mb-5">
            Loading courses...
          </h1>
        </div>
      </HomeLayout>
    );
  }

  if (error) {
    return (
      <HomeLayout>
        <div className="min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white">
          <h1 className="text-center text-3xl font-semibold mb-5">
            Error loading courses: {error}
          </h1>
        </div>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white">
        <h1 className="text-center text-3xl font-semibold mb-5">
          Explore the courses made by
          <span className="font-bold text-yellow-500"> Industry experts</span>
        </h1>
        <div className="mb-10 flex flex-wrap gap-14">
          {courseData?.length ? (
            courseData.map((element) => (
              <CourseCard key={element._id} data={element} />
            ))
          ) : (
            <p>No courses available</p>
          )}
        </div>
      </div>
    </HomeLayout>
  );
}

export default CourseList;
