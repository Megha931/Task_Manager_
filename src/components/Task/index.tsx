
import React, { useState } from "react";
import { TimeOutline } from "react-ionicons";
import { TaskT, Tag } from "../../types";

interface TaskProps {
  task: TaskT;
  provided: any;
  handleDeleteTask: (taskId: string, columnId: string) => void;
  columnId: string;
}

const Task = ({ task, provided, handleDeleteTask, columnId }: TaskProps) => {
  const { id, title, description, priority, deadline, image, alt, tags } = task;
  const [imagePreview, setImagePreview] = useState<string | undefined>(image); 

  const deleteButtonStyle = {
    backgroundColor: "#e0f7fa",
    color: "#00796b", 
    padding: "8px 12px",
    borderRadius: "4px",
    marginTop: "8px",
    cursor: "pointer",
    transition: "background-color 0.2s, color 0.2s",
  };

  const handleDeleteClick = () => {
    handleDeleteTask(id, columnId);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target) {
          setImagePreview(e.target.result as string); 
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="w-full cursor-grab bg-[#fff] flex flex-col justify-between gap-3 items-start shadow-sm rounded-xl px-3 py-4"
    >
      {/* Image Preview */}
      {imagePreview && (
        <img
          src={imagePreview}
          alt={alt || "Task Image"}
          className="w-full h-[170px] rounded-lg"
        />
      )}
      {/* File Input for Image */}
      <input
        type="file"
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
        id={`image-upload-${id}`}
        style={{ display: "none" }} 
      />
      <label
        htmlFor={`image-upload-${id}`}
        className="cursor-pointer text-blue-500"
        style={{
          display: "block",
          textAlign: "center",
          width: "100%",
          padding: "8px",
          borderRadius: "4px",
          border: "1px dashed #e0f7fa", 
          color: "#00796b",
          backgroundColor: "#e0f7fa", 
          textDecoration: "none", 
        }}
      >
        {imagePreview ? "Change Image" : "Choose File"}
      </label>
      <div className="flex items-center gap-2">
        {tags.map((tag: Tag) => (
          <span
            key={tag.title}
            className="px-[10px] py-[2px] text-[13px] font-medium rounded-md"
            style={{ backgroundColor: tag.bg, color: tag.text }}
          >
            {tag.title}
          </span>
        ))}
      </div>
      <div className="w-full flex items-start flex-col gap-0">
        <span className="text-[15.5px] font-medium text-[#555]">{title}</span>
        <span className="text-[13.5px] text-gray-500">{description}</span>
      </div>
      <div className="w-full border border-dashed"></div>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-1">
          <TimeOutline color={"#666"} width="19px" height="19px" />
          <span className="text-[13px] text-gray-700">{deadline} mins</span>
        </div>
        <div
          className={`w-[60px] rounded-full h-[5px] ${
            priority === "high"
              ? "bg-red-500"
              : priority === "medium"
              ? "bg-orange-500"
              : "bg-blue-500"
          }`}
        ></div>
      </div>
      <button
        style={deleteButtonStyle}
        onClick={handleDeleteClick}
        className="p-1 rounded mt-2 hover:bg-blue-300 active:bg-red-500 transition-colors duration-200"
      >
        Delete
      </button>
    </div>
  );
};

export default Task;
