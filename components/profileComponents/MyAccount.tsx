import React from "react";
import Image from "next/image";
import defaultAvatar from "../../public/assests/avatar.png";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { IoCameraReverseOutline } from "react-icons/io5";

const MyAccount = () => {
  const imageUrl = null;

  return (
    <div className="flex flex-col items-center justify-center mx-auto max-w-96">
      <div className="relative">
        <Image
          className="rounded-full border-4 border-teal-500 "
          src={imageUrl ? imageUrl : defaultAvatar}
          alt=""
          width={120}
          objectFit="cover"
        />
        <button className="absolute right-0 bottom-4 bg-black rounded-full p-1">
          <IoCameraReverseOutline size={20} color="white" />
        </button>
      </div>
      <div className="w-full">
        <form>
          <div className="my-3">
            <label className="font-Poppins">UserName</label>
            <Input className="w-full font-Poppins mt-2" disabled />
          </div>
          <div className="my-3">
            <label className="font-Poppins">Name</label>
            <Input className="w-full font-Poppins mt-2" />
          </div>
          <div className="my-3">
            <label className="font-Poppins">Email</label>
            <Input className="w-full font-Poppins mt-2" disabled />
          </div>

          <Button className="w-full mt-4 text-lg">Save</Button>
        </form>
      </div>
    </div>
  );
};

export default MyAccount;
