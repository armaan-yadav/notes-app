import { Plus } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type Props = {
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
};

const TagsInput = (props: Props) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="flex items-center justify-start gap-3">
      <Input
        type="text"
        className="w-[50%]"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button
        onClick={() => {
          props.setTags((prev) => [...prev, inputValue]);
          setInputValue("");
        }}
      >
        <Plus />
      </Button>
    </div>
  );
};

export default TagsInput;
