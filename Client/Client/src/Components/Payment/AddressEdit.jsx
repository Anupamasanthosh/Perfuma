import React from "react";

function AddressEdit({ handleChange, handleSubmit,validationErrors,address}) {

  return (
    <div class="px-4 py-8 sm:px-10">
      <div class="relative mt-6">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-center text-sm leading-5">
          <span class="px-2 text-gray-500 bg-white">Add Address</span>
        </div>
      </div>
      <div class="mt-6">
        <div class="w-full space-y-6">
          <div class="w-full">
            <div class=" relative ">
              <input
                type="text"
                id="street"
                name="street"
                value={address? address.street:''}
                onChange={(e) => handleChange(e)}
                class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Your Street"
              />
            </div>
            {validationErrors&& validationErrors.street && (
          <div className="text-red-500">{validationErrors.street}</div>
        )}
          </div>
          <div class="w-full">
            <div class=" relative ">
              <input
                type="text"
                id="city"
                name="city"
                value={address? address.city:''}
                onChange={(e) => handleChange(e)}
                class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Your city"
              />
            </div>
            {validationErrors&&validationErrors.city && (
          <div className="text-red-500">{validationErrors.city}</div>
        )}
          </div>
          <div class="w-full">
            <div class=" relative ">
              <input
                type="text"
                id="state"
                name="state"
                value={address? address.state:''}
                onChange={(e) => handleChange(e)}
                class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Your state"
              />
            </div>
            {validationErrors&&validationErrors.state && (
          <div className="text-red-500">{validationErrors.state}</div>
        )}
          </div>
          <div class="w-full">
            <div class=" relative ">
              <input
                type="text"
                id="post"
                name="post"
                value={address? address.post:''}
                onChange={(e) => handleChange(e)}
                class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Your pincode"
              />
              {validationErrors&&validationErrors.post && (
          <div className="text-red-500">{validationErrors.post}</div>
        )}
            </div>
            
          </div>
          <div>
            <span class="block w-full rounded-md shadow-sm">
              <button
                type="button"
                class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                onClick={(e) => handleSubmit(e)}
              >
                Save
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddressEdit;
