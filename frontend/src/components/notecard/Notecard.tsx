import { Delete, Edit, PinIcon, Tags, Trash } from "lucide-react";

interface Props {
  title: string;
  date: string;
  content: string;
  tags: string[];
  isPinned: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onPinNote: () => void;
}

const Notecard = (props: Props) => {
  return (
    <div className="w-full rounded-sm ring-1 m-2 p-2 hover:shadow-lg cursor-pointer transition-all">
      <div className="flex items-center  justify-between">
        <div className="flex items-center">
          <h6 className="text-lg">{props.title}</h6>
          <span className="text-sm">{props.date}</span>
        </div>

        <PinIcon
          size={16}
          fill={`${props.isPinned ? "" : "none"}`}
          className="cursor-pointer hover:text-blue-400 transition-all"
        />
      </div>
      <p className="text-sm">
        {props.content.length < 60
          ? props.content
          : `${props.content.slice(0, 120)}...`}
      </p>

      <div className="flex justify-between items-center my-1">
        <div className="text-sm">{props.tags.map((e) => `#${e} `)}</div>
        <div className="flex items-center gap-2">
          <Edit
            size={16}
            onClick={props.onEdit}
            className="cursor-pointer hover:text-blue-400 transition-all"
          />
          <Trash
            size={16}
            onClick={props.onDelete}
            className="cursor-pointer hover:text-red-400 transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default Notecard;
