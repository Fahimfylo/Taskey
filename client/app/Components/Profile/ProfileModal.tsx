"use client";
import { useTasks } from "@/context/taskContext";
import { useUserContext } from "@/context/userContext";
import useDetectOutside from "@/hooks/useDetectOutside";
import Avatar from "../../../public/avatar.png";
import Image from "next/image";
import React from "react";
import { check, github, mail } from "@/utils/Icons";

function ProfileModal() {
  const ref = React.useRef(null);
  const { closeModal } = useTasks();
  const { user, updateUser, handlerUserInput, userState, changePassword} =
    useUserContext();

    useDetectOutside({
      ref,
      callBack: () => {
        closeModal();
      },
    });

  const { name, email, photo } = user;

  // password
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");

  const handlePassword = (type: string) => (e: any) => {
    if (type === "old") {
      setOldPassword(e.target.value);
    } else {
      setNewPassword(e.target.value);
    }
  };

  return (
    <div className="fixed left-0 top-0 z-50 h-full w-full bg-[#333]/30 overflow-hidden">
      <div
        ref={ref}
        className="py-5 px-6 max-w-[520px] h-[600px] w-full flex flex-col gap-3 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-md"
      >
        <div className="absolute left-0 top-0 h-[70px] w-full bg-[#323232]/10 rounded-tr-md rounded-tl-md">
          <div className="mt-8 ml-5 relative flex justify-between">
            <div className="relative inline-block">
              <Image
                src={Avatar}
                alt="avatar"
                width={70}
                height={70}
                className="rounded-full z-50"
              />
              <div className="absolute bottom-0 right-1 shadow-sm">
                <span className="absolute bottom-0 left-[50%] bg-blue-500 rounded-full translate-x-[-80%] translate-y-[-80%] w-5 h-5 flex items-center justify-center text-xs text-white">
                  {check}
                </span>
              </div>
            </div>
            <div className="flex">
              <button className="mt-12 flex items-center gap-2 border-2 border-[#323232]/10 rounded-md py-2 px-5 mr-3 text-xs font-medium text-[#323232]">
                {github} Github
              </button>
              <button className="mt-12 flex items-center gap-2 border-2 border-[#323232]/10 rounded-md py-2 px-5 mr-5 text-xs font-medium text-[#323232]">
                {check} Verified
              </button>
            </div>
          </div>
          <div className="mx-5">
            <h1 className="text-lg font-bold">{name}</h1>
            <p className="text-sm text-gray-500">{email}</p>
          </div>
          <form
            action=""
            className="mt-4 mx-5 pt-2 flex flex-col border-t-2 border-t-[#323232]/10"
            onSubmit={(e) => {
              e.preventDefault();
              updateUser(e, {
                name: userState.name,
                email: userState.email,
              });
            }}
          >
            <div className="pt-2 grid grid-cols-[150px_1fr]">
              <label htmlFor="name" className="text-sm font-medium">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                defaultValue={name}
                onChange={(e) => handlerUserInput("name")(e)}
                className="py-[0.4rem] px-3 font-medium rounded-lg border-2 border-[#323232]/10"
              />
            </div>

            <div className="pt-4 mt-5 grid grid-cols-[150px_1fr] border-t-2 border-t-[#323232]/10">
              <label htmlFor="name" className="text-sm font-medium">
                Email Address
              </label>
              <input
                type="text"
                name="email"
                id="email"
                defaultValue={email}
                onChange={(e) => handlerUserInput("email")(e)}
                className="py-[0.4rem] px-10 font-medium rounded-lg border-2 border-[#323232]/10"
              />
              <span className="absolute left-[185px] top-[290px] flex text-[#323232]/50">
                {mail}
              </span>
            </div>

            <div className="mt-4 pt-4 grid grid-cols-2 gap-4 border-t-2 border-t-[#323232]/10">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="oldPassword"
                  className="pl-1 text-sm font-medium"
                >
                  Old Password
                </label>
                <input
                  type="password"
                  id="oldPassword"
                  value={oldPassword}
                  onChange={handlePassword("old")}
                  className="py-[0.4rem] px-3 font-medium rounded-lg border-2 border-[#323232]/10"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="newPassword"
                  className="pl-1 text-sm font-medium"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={handlePassword("new")}
                  className="py-[0.4rem] px-3 font-medium rounded-lg border-2 border-[#323232]/10"
                />
              </div>
              <div className="flex">
                <button
                  className="py-3 px-3 bg-blue-500 text-white text-sm font-medium rounded-md
                hover:bg-blue-400 transition-all duration-300"
                  type="button"
                  onClick={() => changePassword(oldPassword, newPassword)}
                >
                  Change Password
                </button>
              </div>
            </div>
            <div className="flex mt-5 justify-end border-t-2 border-t-[#323232]/10">
              <button
                type="submit"
                className="mt-3 py-2 px-4 bg-transparent text-black text-sm font-medium rounded-md border-2 border-[#323232]/10
                     hover:bg-[#EB4E31] hover:border-transparent hover:text-white transition-all duration-300"
              >
                Cancel
              </button>
              <button
                className="mt-3 py-2 ml-3 bg-[#3aafae] px-4 text-white text-sm font-medium rounded-md 
                     hover:bg-[#2e8d8c]/90 hover:border-transparent hover:text-white transition-all duration-300"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
