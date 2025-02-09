import { Search, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Input } from "../ui/input";

interface Props {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  getResults: () => void;
}

const Searchbar = (props: Props) => {
  return (
    <div className="h-[50px] py-2 ">
      <div className="flex items-center bg-slate-100 w-96 px-2 rounded-sm">
        <Input
          className="border-none text-gray-400  focus:outline-none focus:ring-0 focus:border-0 focus-visible:ring-0 focus-visible:border-0 w-[400px]"
          placeholder="Search your notes"
          value={props.searchValue}
          onChange={({ target }) => props.setSearchValue(target.value)}
        />
        {props.searchValue && (
          <X
            className="text-gray-400"
            onClick={(_) => props.setSearchValue("")}
          />
        )}
        <Search className="text-gray-400" onClick={props.getResults} />
      </div>
    </div>
  );
};

export default Searchbar;
