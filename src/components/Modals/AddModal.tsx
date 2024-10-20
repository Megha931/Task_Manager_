import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { getRandomColors } from "../../helpers/getRandomColors";
import { Tag } from "../../types"; 

interface TaskData {
  id: string;
  title: string;
  description: string;
  priority: string;
  deadline: number;
  image?: string; 
  alt?: string; 
  tags: Tag[];
}

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddTask: (taskData: TaskData) => void;
  handleDeleteTask: (taskId: string) => void;
  selectedTask?: TaskData;
}

const AddModal = ({
  isOpen,
  onClose,
  setOpen,
  handleAddTask,
  handleDeleteTask,
  selectedTask,
}: AddModalProps) => {
  const initialTaskData: TaskData = selectedTask || {
    id: uuidv4(),
    title: "",
    description: "",
    priority: "",
    deadline: 0,
    tags: [],
  };

  const [taskData, setTaskData] = useState<TaskData>(initialTaskData);
  const [tagTitle, setTagTitle] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null); 
  const [imagePreview, setImagePreview] = useState<string | null>(null); 

  useEffect(() => {
    if (selectedTask) {
      setTaskData(selectedTask);
      if (selectedTask.image) {
        setImagePreview(selectedTask.image); 
      }
    }
  }, [selectedTask]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target) {
          setImageFile(e.target.result as string); // Store image file
          setImagePreview(e.target.result as string); // Preview image
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleAddTag = () => {
    if (tagTitle.trim() !== "") {
      const { bg, text } = getRandomColors();
      const newTag: Tag = { title: tagTitle.trim(), bg, text };
      setTaskData({ ...taskData, tags: [...taskData.tags, newTag] });
      setTagTitle("");
    }
  };

  const closeModal = () => {
    setOpen(false);
    onClose();
    setTaskData(initialTaskData);
    setImageFile(null);
    setImagePreview(null); 
  };

  const handleSubmit = () => {
    if (imageFile) {
      setTaskData({ ...taskData, image: imageFile as string });
    }
    handleAddTask(taskData);
    closeModal();
  };

  const handleDelete = () => {
    if (selectedTask) {
      handleDeleteTask(taskData.id); 
      closeModal();
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div
        className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
        onClick={closeModal}
      ></div>
      <div className="relative w-[30vw] md:w-[30vw] bg-white rounded-lg shadow-lg z-50 flex flex-col items-center p-6">
        <input
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full h-12 px-3 outline-none rounded-md bg-gray-200 border border-gray-300 mb-3 text-sm"
        />
        <input
          type="text"
          name="description"
          value={taskData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full h-12 px-3 outline-none rounded-md bg-gray-200 border border-gray-300 mb-3 text-sm"
        />
        <label
          htmlFor="upload-button"
          className="w-full h-12 cursor-pointer bg-blue-500 text-white text-sm font-medium rounded-md flex justify-center items-center mb-3"
        >
          Upload Image
          <input
            id="upload-button"
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
        </label>
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-32 object-cover rounded-md mb-3"
          />
        )}
        <div className="w-full flex items-center mb-3">
          <input
            type="text"
            value={tagTitle}
            onChange={(e) => setTagTitle(e.target.value)}
            placeholder="Add a tag"
            className="w-full h-12 px-3 outline-none rounded-md bg-gray-200 border border-gray-300 text-sm mr-2"
          />
          <button
            onClick={handleAddTag}
            className="h-12 px-3 rounded-md bg-blue-500 text-white text-sm font-medium"
          >
            Add Tag
          </button>
        </div>
        <div className="w-full flex justify-end">
          <button
            onClick={handleSubmit}
            className="h-12 px-4 rounded-md bg-green-500 text-white text-sm font-medium mr-2"
          >
            {selectedTask ? "Update Task" : "Add Task"}
          </button>
          {selectedTask && (
            <button
              onClick={handleDelete}
              className="h-12 px-4 rounded-md bg-red-500 text-white text-sm font-medium mr-2"
            >
              Delete Task
            </button>
          )}
          <button
            onClick={closeModal}
            className="h-12 px-4 rounded-md bg-gray-500 text-white text-sm font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
