import HomeLayout from "../Layouts/HomeLayout";
import aboutMainImage from "../assets/images/aboutMainImage.png";
import abjimage from "../assets/images/apj.png";
import billgateimage from "../assets/images/billGates.png";
import einsteinimage from "../assets/images/einstein.png";
import nelsonmandelaimage from "../assets/images/nelsonMandela.png";
import stevejobsimage from "../assets/images/steveJobs.png";

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
                filter: "drop-shadow(0px 10px 10px rgb(0,0,0));",
              }}
              alt="aboutMainImage"
              className="drop-shadow-2xl"
              src={aboutMainImage}
            />
          </div>
        </div>

        <div className="carousel w-1/2  my-16 m-auto">
          <div id="slide1" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
              <img
                src={nelsonmandelaimage}
                className="w-40 rounded-full boarder-2 boarder-gray-200"
              />
              <p className="text-xl text-gray-200">
                Education is the most powerful tool you can use to change the
                world
              </p>
              <h3 className="text-2xl font-semibold">Nelson mandela</h3>
              <div className="absolute   flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide5" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide2" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
          <div id="slide2" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
              <img
                src={abjimage}
                className="w-40 rounded-full boarder-2 boarder-gray-200"
              />
              <p className="text-xl text-gray-200">
                “Dream is not that which you see while sleeping it is something
                that does not let you sleep.”
              </p>
              <h3 className="text-2xl font-semibold">Dr Abj Abdul kalam</h3>
              <div className="absolute  flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide1" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide3" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
          <div id="slide3" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
              <img
                src={einsteinimage}
                className="w-40 rounded-full boarder-2 boarder-gray-200"
              />
              <p className="text-xl text-gray-200">
                Learn from yesterday, live for today, hope for tomorrow.
              </p>
              <h3 className="text-2xl font-semibold">Albert Einstein</h3>
              <div className="absolute  flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide2" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide4" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>

          <div id="slide4" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
              <img
                src={stevejobsimage}
                className="w-40 rounded-full boarder-2 boarder-gray-200"
              />
              <p className="text-xl text-gray-200">
                “Don't let the noise of others' opinions drown out your own
                inner voice.”
              </p>
              <h3 className="text-2xl font-semibold">SteveJob</h3>
              <div className="absolute  flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide3" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide5" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
          <div id="slide5" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
              <img
                src={billgateimage}
                className="w-40 rounded-full boarder-2 boarder-gray-200"
              />
              <p className="text-xl text-gray-200">
                It’s fine to celebrate success but it is more important to heed
                the lessons of failure.
              </p>
              <h3 className="text-2xl font-semibold">Bill Gates</h3>
              <div className="absolute  flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide4" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide1" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
export default AboutUs;
