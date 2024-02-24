import HomeLayout from "../Layouts/HomeLayout";
import CarouselSlide from "../Components/CarouselSlide";
import aboutMainImage from "../assets/images/aboutMainImage.png";
import { celebrities } from "../constants/CelebrityData";
function AboutUs() {
  return (
    <HomeLayout>
      <div className="pl-20 pt-20 flex flex-col text-white">
        <div className="flex items-center gap-5 mx-10">
          <section className="w-1/2 spce-y-10">
            <h1 className="text-5xl text-yellow-500 font-semibold">
              Affordable And Quality Education
            </h1>
            <p className="text-xl mt-5 text-gray-200 ">
              our goal is to provide the affordable and quality education to the
              world we are providing the platform from the aspiring teacher to
              share their creativity to each other to empower and contribute in
              the growth and weelness of mankind
            </p>
          </section>
          <div className="w-1/2 ">
            <img
              id="test1"
              style={{
                filter: "drop-shadow(0px 10px 10px rgb(0,0,0))",
              }}
              alt="aboutMainImage"
              className="drop-shadow-2xl"
              src={aboutMainImage}
            />
          </div>
        </div>

        <div className="carousel w-1/2  my-16 m-auto">
          {celebrities &&
            celebrities.map((celebrity) => (
              <CarouselSlide
                {...celebrity}
                key={celebrity.slideNumber}
                totalSlides={celebrities.length}
              />
            ))}
        </div>
      </div>
    </HomeLayout>
  );
}
export default AboutUs;
