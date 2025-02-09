import Navbar from "@/components/navbar/Navbar";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import AddEditNote from "@/components/addeditnote/AddEditNote";
import Notecard from "@/components/notecard/Notecard";
import { Note } from "@/types";
import { Plus } from "lucide-react";
import { useState } from "react";

type Props = {};

const HomePage = (props: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleEditNote = (note: Note) => {
    setSelectedNote(note);
    setIsOpen(true);
  };

  const temp = {
    title: "I am titleee",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum beatae sunt minus modi commodi cupiditate alias aperiam, molestiae sint aut facere quidem reiciendis, minima harum maxime recusandae debitis numquam ut! Sunt vitae dolor ullam deserunt architecto dignissimos, voluptas ipsam atque.",
    date: "12-02-25",
    isPinned: false,
    tags: ["abc", "react", "node"],
  };

  return (
    <div className="bg-[#e6e5ff] relative h-screen">
      <Navbar />
      <div className="grid lg:grid-cols-3 gap-4 mt-8 px-6">
        <Notecard
          {...temp}
          onDelete={() => {}}
          onEdit={() => {
            handleEditNote({
              ...temp,
            });
          }}
          onPinNote={() => {}}
        />
      </div>

      <Dialog
        open={isOpen}
        onOpenChange={(e) => {
          setIsOpen(e);
        }}
      >
        <DialogTrigger>
          <div className="p-4 bg-blue-500 absolute right-4 bottom-4 rounded-md">
            <Plus />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Add Note</DialogTitle>
          <AddEditNote type="add" data={selectedNote} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HomePage;
