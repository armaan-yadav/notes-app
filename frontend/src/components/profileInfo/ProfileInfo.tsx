import { getInitials } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const ProfileInfo = ({ name }: { name: string }) => {
  const navigator = useNavigate();

  const logout = () => {
    // handle logout
    navigator("/login");
  };

  return (
    <div className="flex gap-3">
      <div className="rounded-full size-[40px] bg-[#d4d4de] uppercase flex items-center justify-center  font-semibold text-white">
        {getInitials(name)}
      </div>
      <div className="max-sm:hidden">
        <p className="capitalize text-sm font-semibold">{name}</p>

        <p className="underline text-sm">Log Out</p>
      </div>
    </div>
  );
};

export default ProfileInfo;
