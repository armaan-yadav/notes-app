import React, { useState } from "react";
import ProfileInfo from "../profileInfo/ProfileInfo";
import Searchbar from "../searchbar/Searchbar";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");

  const getResults = () => {};

  return (
    <div className="w-full bg-[#e6e5ff] ring-1 py-2 px-4 flex justify-between items-center h-[56px]">
      <div className="flex flex-1 items-center justify-start gap-4">
        <h1 className="text-xl font-semibold">Notes App</h1>
        <div className="max-sm:hidden">
          <Searchbar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            getResults={getResults}
          />
        </div>
      </div>
      <ProfileInfo name="Armaan Yadav" />
    </div>
  );
};

export default Navbar;
