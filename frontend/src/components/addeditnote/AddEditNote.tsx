import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import TagsInput from "../tagsinput/TagsInput";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { formatDate } from "@/utils";
import { Note } from "@/types";

type Props = {
  type: "add" | "edit";
  data: Note | null;
};

const AddEditNote = (props: Props) => {
  const [title, setTitle] = useState(props.data?.title ?? "");
  const [content, setContent] = useState(props.data?.content ?? "");
  const [tags, setTags] = useState<string[]>(props.data?.tags ?? []);
  const [date, setDate] = useState(props.data?.date ?? "");

  console.log(props.data?.title);

  const [error, setError] = useState<string | null>(null);

  const handleAddNote = () => {
    if (title == "") {
      setError("Please enter a title");
      return;
    }
    if (content == "") {
      setError("Please enter some content");
      return;
    }

    setError("");
    // handle add note
    const note: Note = {
      content,
      date: formatDate(Date.now()),
      tags,
      title,
    };

    console.log(note);
  };

  const handleEditNote = () => {};

  return (
    <div>
      <div>
        <Label htmlFor="title" className="text-sm text-gray-300">
          TITLE
        </Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          name="title"
        />
      </div>
      <div>
        <Label htmlFor="content" className="text-sm text-gray-300">
          Content
        </Label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          name="content"
        />
      </div>

      <div className="flex flex-col">
        <Label className="text-sm text-gray-300">Tags</Label>
        <div className="flex gap-2 flex-wrap">
          {tags.map((e) => (
            <span className="ring-1 rounded-sm px-2 flex items-center justify-center gap-1 text-md ">
              {`#${e} `}{" "}
              <X
                size={"17px"}
                color="red"
                onClick={() => {
                  setTags((prev) => prev.filter((a) => a != e));
                }}
              />
            </span>
          ))}
        </div>
        <TagsInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-400">{error}</p>}
      <Button onClick={props.type == "add" ? handleAddNote : handleEditNote}>
        Add Note
      </Button>
    </div>
  );
};

export default AddEditNote;
