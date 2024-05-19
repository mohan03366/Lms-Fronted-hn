import { useSelector } from "react-redux";
import Homelayout from "../../Layouts/HomeLayout";
import { Link } from "react-router-dom";

function Profile() {
  const userData = useSelector((state) => state?.auth?.data);
  return (
    <Homelayout>
      <div className="min-h-[90vh] flex flex-item-center justify-center">
        <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-100 shadow-[0_0_10px_black]">
          <img
            src={userData?.avatar?.secure_url}
            className="w-40 m-auto rounded-full border-black"
          />
          <h3 className="text-xl  font-semibold text-center capitalize ">
            {userData?.fullName}
          </h3>
          <div className="grid grid-cols-2">
            <p>Email:</p>
            <p>{userData?.email}</p>
            <p>Role:</p>
            <p>{userData?.role}</p>
            <p>Subscription:</p>
            <p>
              {userData?.Subscription?.status === "active"
                ? "action"
                : "inactive"}
            </p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <Link
              to="/changePassword"
              className="w-1/2 bg-yellow-600 hover:bg-yellow-400 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center"
            >
              <button>changePassword</button>
            </Link>

            <Link
              to="/user/editProfile"
              className="w-1/2 bg-yellow-600 hover:bg-yellow-400 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center"
            >
              <button>editProfile</button>
            </Link>
          </div>
          {userData?.Subscription?.status === "active" && (
            <button className="w-full bg-red-600 hover:bg-red-300 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center">
              cancelSubscription
            </button>
          )}
        </div>
      </div>
    </Homelayout>
  );
}
export default Profile;
