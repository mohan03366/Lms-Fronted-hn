import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import {
  getRazorPayId,
  purchaseCourseBundle,
  verifyUserPayment,
} from "../../Redux/Slices/RazorpaySlice";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const razorpayKey = useSelector((state) => state?.razorpay?.key);
  const subscription_id = useSelector(
    (state) => state?.razorpay?.subscription_id
  );

  const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_subscription_id: "",
    razorpay_signature: "",
  };

  async function handleSubscription(e) {
    e.preventDefault();
    if (!razorpayKey || !subscription_id) {
      toast.error("Something went wrong");
      return;
    }
    const options = {
      key: razorpayKey,
      subscription_id: subscription_id,
      name: "Coursify Pvt. Ltd.",
      description: "Subscription",
      theme: {
        color: "#F37254",
      },
      handler: async function (response) {
        paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
        paymentDetails.razorpay_signature = response.razorpay_signature;
        paymentDetails.razorpay_subscription_id =
          response.razorpay_subscription_id;

        toast.success("Payment successful");

        const res = await dispatch(verifyUserPayment(paymentDetails));
        console.log(res);
        res?.payload?.success
          ? navigate("/checkout/success")
          : navigate("/checkout/fail");
      },
      method: {
        netbanking: true,
        card: true,
        upi: true,
        wallet: true,
        emi: true,
        bank_transfer: true,
        upi_intent: true,
        qr: true,
      },
      modal: {
        ondismiss: function () {
          console.log("Checkout form closed");
          toast.error("Payment process was cancelled.");
        },
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  async function load() {
    try {
      const razorPayIdResponse = await dispatch(getRazorPayId());
      console.log("RazorPay ID Response:", razorPayIdResponse);

      const courseBundleResponse = await dispatch(purchaseCourseBundle());
      console.log("Course Bundle Response:", courseBundleResponse);
    } catch (error) {
      toast.error("Failed to load payment details");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <HomeLayout>
        <div className="min-h-[90vh] flex items-center justify-center text-white">
          <p>Loading...</p>
        </div>
      </HomeLayout>
    );
  }

  console.log("razorpayKey", razorpayKey);
  console.log("subscription_id", subscription_id);

  return (
    <HomeLayout>
      <form
        onSubmit={handleSubscription}
        className="min-h-[90vh] flex items-center justify-center text-white"
      >
        <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
          <h1 className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">
            Subscription Bundle
          </h1>
          <div className="px-4 space-y-5 text-center">
            <p className="text-[17px]">
              This purchase will allow you to access all available courses on
              our platform for{" "}
              <span className="text-yellow-500 font-bold">
                <br />1 Year duration
              </span>
              . All the existing and newly launched courses will also be
              available.
            </p>

            <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
              <BiRupee />
              <span>499</span> only
            </p>
            <div className="text-gray-200">
              <p>100% refund on cancellation</p>
              <p>* Terms and conditions apply *</p>
            </div>
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full left-0 text-xl font-bold rounded-bl-lg rounded-br-lg py-2"
            >
              Buy now
            </button>
          </div>
        </div>
      </form>
    </HomeLayout>
  );
}

export default Checkout;
