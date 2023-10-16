import React, { useState } from "react";
import { useForm } from "react-hook-form";

function Form({ handleChange, onSubmit,signUp}) {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit(onSubmit)}>
      {signUp && (
        <div className="flex flex-col pt-4">
          <div className="flex relative ">
            <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
              <svg
                width="15"
                height="15"
                fill="currentColor"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z"></path>
              </svg>
            </span>
            <input
              type="text"
              id="design-login-name"
              className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="Name"
              name="name"
              {...register("name", {
                required: "Name is required",
                maxLength: {
                  value: 10,
                  message: "Name must be less than 10 characters",
                },
                minLength: {
                  value: 3,
                  message: "Name must be atleast 3 characters",
                },
              })}
              onChange={(e) => handleChange(e)}
            />
          </div>
          {errors.name && (
            <p className="text-xs italic text-red-500">{errors.name.message}</p>
          )}
        </div>
      )}
      <div className="flex flex-col pt-4">
        <div className="flex relative ">
          <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
            <svg
              width="15"
              height="15"
              fill="currentColor"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z"></path>
            </svg>
          </span>
          <input
            type="text"
            id="design-login-email"
            className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="Email"
            name="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message:
                  "You have entered an invalid email address.Please try again",
              },
            })}
            onChange={(e) => handleChange(e)}
          />
        </div>
        {errors.email && (
            <p className="text-xs italic text-red-500">{errors.email.message}</p>
          )}
      </div>
      <div className="flex flex-col pt-4 mb-12">
        <div className="flex relative ">
          <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
            <svg
              width="15"
              height="15"
              fill="currentColor"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
            </svg>
          </span>
          <input
            type="password"
            id="design-login-password"
            className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="Password"
            name="password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/,
                message:
                  "Password Should Contain At Least One Capital Letter One Small Letter and one digit",
              },
              maxLength: {
                value: 10,
                message: "Exceeds Maximum Length",
              },
              minLength: {
                value: 5,
                message: "Minimum 5 Characters Required",
              },
            })}
            onChange={(e) => handleChange(e)}
          />
        </div>
        {errors.password && (
            <p className="text-xs italic text-red-500">{errors.password.message}</p>
          )}
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-black shadow-md hover:text-black hover:bg-white focus:outline-none focus:ring-2"
      >
        <span className="w-full">Submit</span>
      </button>

     
    </form>
  );
}

export default Form;
