import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

const SignUpModal = () => {
  return (
    <div className="p-5">
      <form action="" className="">
        <div className="text-center font-Poppins text-2xl font-medium">
          Sign Up
        </div>

        <div className="flex flex-col gap-6 mt-6">
          <div className="">
            <Input placeholder="Enter Username" />
          </div>
          <div className="">
            <Input placeholder="Enter Email" />
          </div>
          <div className="">
            <Input placeholder="Enter password" />
          </div>
        </div>

        <div className="my-3">
          <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
            Or join with
          </h5>
          <div className="flex items-center justify-center my-3">
            <FcGoogle
              size={30}
              className="cursor-pointer mr-2"
              onClick={() => {}}
            />
            <AiFillGithub
              size={30}
              className="cursor-pointer ml-2"
              onClick={() => {}}
            />
          </div>

          <h5 className="text-center pt-4 font-Poppins text-[14px]">
            Already have any account?{" "}
            <span
              className="text-[#2190ff] pl-1 cursor-pointer hover:underline"
              // onClick={openSignUpModal}
            >
              Sign in
            </span>
          </h5>
        </div>

        <Button className="w-full">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpModal;
