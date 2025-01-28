import Image from "next/image";
import React from "react";
import thumbnail from "../../public/assests/thumbnail.webp";
import { Button } from "../ui/Button";
import {
  useCreateOrderMutation,
  useCreatePaymentIntentMutation,
} from "@/redux/features/orders/orderApi";
import { useGetRefreshTokenQuery } from "@/redux/features/auth/authApi";

const CourseImageSection = ({ data }) => {
  const {
    _id,
    price,
    thumbnail: { url },
    estimatedPrice,
  } = data;

  const [createPayment, { data: paymentData, error }] =
    useCreatePaymentIntentMutation();
  const [createOrder, { data: orderData }] = useCreateOrderMutation();
  // const { data: refreshData } = useGetRefreshTokenQuery(null);

  // console.log(refreshData);

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
    console.log("amount: " + amount);

    await createPayment({
      amount: amount,
      courseId: _id,
    });

    console.log(paymentData);
    console.log(error);

    const options = {
      key: process.env.RAZOR_PAY_KEY,
      name: "Sameer Nimje",
      currency: paymentData.order.currency,
      amount: paymentData?.order.amount,
      order_id: paymentData?.order.id,
      description: "Thank you",
      prefill: {
        name: "Manu Arora",
        email: "manuarorawork@gmail.com",
        contact: "9999999999",
      },
      handler: async function (response: any) {
        try {
          // Extract the payment ID from the response
          console.log(response);

          const paymentId = response.razorpay_payment_id;
          if (!paymentId) {
            console.error("Payment ID is missing in the response.");
            return;
          }

          console.log("Payment ID:", paymentId);

          // Check if the payment was successful before proceeding
          if (response.razorpay_payment_status === "success") {
            // Create the order with courseId and paymentId
            await createOrder({
              orderId: paymentData.newOrder._id, // Ensure `paymentData.newOrder._id` is valid
              status: "captured", // Adjust as needed (use 'captured' if payment was successful)
              paymentId,
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
      <div className="flex items-center gap-2">
        <div className="font-Poppins text-lg font-medium">₹{price}</div>
        <div className="font-Poppins text-sm font-medium -mt-3 line-through dark:text-white/75">
          ₹{estimatedPrice}
        </div>
        <div className="font-Poppins text-lg font-medium">69% Off</div>
      </div>
      <div className="">
        <Button
          size={"lg"}
          onClick={() => makePayment(price)}
          className="rounded-full text-base bg-red-600 hover:bg-red-600/90 text-white"
        >
          Buy Now ₹99.99
        </Button>
      </div>

      <div className="">
        <li className="">Source code inlcuded</li>
        <li className="">Source code inlcuded</li>
        <li className="">Source code inlcuded</li>
        <li className="">Source code inlcuded</li>
      </div>
    </div>
  );
};

export default CourseImageSection;
