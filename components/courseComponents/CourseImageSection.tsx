import Image from "next/image";
import React, { useEffect } from "react";
import { Button } from "../ui/Button";
import {
  useCreateOrderMutation,
  useCreatePaymentIntentMutation,
} from "@/redux/features/orders/orderApi";
import { useLazyGetRefreshTokenQuery } from "@/redux/features/auth/authApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Link from "next/link";

const CourseImageSection = ({ data, userCourses }) => {
  const {
    _id,
    price,
    thumbnail: { url },
    estimatedPrice,
    name,
  } = data;

  const [createPayment, { data: paymentData, error: payErr }] =
    useCreatePaymentIntentMutation();
  const [createOrder, {}] = useCreateOrderMutation();
  const [refreshToken, {}] = useLazyGetRefreshTokenQuery();
  const {} = useLoadUserQuery();

  useEffect(() => {
    refreshToken();
  }, []);

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(true);

      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  const makePayment = async (amount: number) => {
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    await createPayment({
      amount: amount,
      courseId: _id,
    });

    if (payErr) {
      await refreshToken();

      await createPayment({
        amount: amount,
        courseId: _id,
      });
    }

    const options = {
      key: process.env.RAZOR_PAY_KEY,
      name: "Sameer Nimje",
      currency: paymentData?.order.currency,
      amount: paymentData?.order.amount,
      order_id: paymentData?.order.id,
      description: "Thank you",
      prefill: {
        name: "Sameer Nimje",
        email: "sameernimje844@gmail.com",
        contact: "8208643722",
      },
      handler: async function (response: any) {
        try {
          // Extract the payment ID from the response

          const paymentId = response.razorpay_payment_id;
          if (!paymentId) {
            console.error("Payment ID is missing in the response.");
            return;
          }

          console.log("Payment ID:", paymentId);

          if (true) {
            await createOrder({
              orderId: paymentData.newOrder._id,
              status: "captured",
              paymentId: paymentId,
            });

            console.log("Order created successfully!");
          } else {
            console.error("Payment was not successful.");
          }
        } catch (error) {
          console.error("Error processing payment:", error);
        }
      },
    };

    const paymentObject = new window.Razorpay(options);

    paymentObject.open();
  };

  return (
    <div className="flex flex-col gap-4">
      <Image
        src={url}
        alt=""
        width={1000}
        height={500}
        className="w-full border-white border"
      />
      <div className="text-2xl font-Poppins font-semibold lg:hidden md:hidden">
        {name}
      </div>

      <div className="flex lg:flex-col md:flex-col justify-between items-center lg:items-start md:items-start">
        <div className="flex items-center gap-2">
          <div className="font-Poppins text-lg font-medium">₹{price}</div>
          <div className="font-Poppins text-sm font-medium -mt-3 line-through dark:text-white/75">
            ₹{estimatedPrice}
          </div>
          <div className="font-Poppins text-lg font-medium">69% Off</div>
        </div>
        <div className="lg:mt-4">
          {userCourses?.some((obj) => obj.courseId === _id) ? (
            <Link href={`/course/${_id}/lecture`}>
              <Button
                size={"lg"}
                onClick={() => makePayment(price)}
                className="rounded-full text-base bg-red-600 hover:bg-red-600/90 text-white"
              >
                Watch Now
              </Button>
            </Link>
          ) : (
            <Button
              size={"lg"}
              onClick={() => makePayment(price)}
              className="rounded-full text-base bg-red-600 hover:bg-red-600/90 text-white"
            >
              Buy Now ₹99.99
            </Button>
          )}
        </div>
      </div>

      <div className="hidden md:block lg:block">
        <li className="">Source code inlcuded</li>
        <li className="">Source code inlcuded</li>
        <li className="">Source code inlcuded</li>
        <li className="">Source code inlcuded</li>
      </div>
    </div>
  );
};

export default CourseImageSection;
