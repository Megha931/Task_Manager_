import { v4 as uuidv4 } from "uuid";
import taskImage from "../assets/images/task.jpg";
import taskImage2 from "../assets/images/task2.jpg";
import taskImage3 from "../assets/images/task3.jpg";
import { Columns } from "../types";
import { getRandomColors } from "../helpers/getRandomColors";

export const Board: Columns = {
	backlog: {
		name: "Backlog",
		items: [
			{
				id: uuidv4(),
				title: "Trees and Stack Series",
				description: "Study and implement various tree and stack data structures.",
				priority: "medium",
				deadline: 50,
				image: taskImage2,
				alt: "task image",
				tags: [
					{ title: "Data Structures", ...getRandomColors() },
					{ title: "Algorithms", ...getRandomColors() },
				],
			},
			{
				id: uuidv4(),
				title: "E-commerce Website",
				description: "Develop a responsive e-commerce website with a user-friendly interface.",
				priority: "low",
				deadline: 50,
				tags: [
					{ title: "Web Development", ...getRandomColors() },
					{ title: "Frontend", ...getRandomColors() },
				],
			},
		],
	},
	pending: {
		name: "Pending",
		items: [
			{
				id: uuidv4(),
				title: "Analysis of Hate Speech Detector Accuracy",
				description: "Analyze the accuracy and performance of a hate speech detection model.",
				priority: "high",
				deadline: 50,
				tags: [
					{ title: "Machine Learning", ...getRandomColors() },
					{ title: "NLP", ...getRandomColors() },
				],
			},
			{
				id: uuidv4(),
				title: "Maps and Unordered Maps",
				description: "Implement and compare different types of map data structures.",
				priority: "low",
				deadline: 50,
				image: taskImage,
				alt: "task image",
				tags: [
					{ title: "Data Structures", ...getRandomColors() },
					{ title: "Algorithms", ...getRandomColors() },
				],
			},
		],
	},
	todo: {
		name: "To Do",
		items: [
			{
				id: uuidv4(),
				title: "Array and Linked List",
				description: "Explore the usage and differences between arrays and linked lists.",
				priority: "medium",
				deadline: 50,
				image: taskImage3,
				alt: "task image",
				tags: [
					{ title: "Data Structures", ...getRandomColors() },
					{ title: "Algorithms", ...getRandomColors() },
				],
			},
		],
	},
	doing: {
		name: "Doing",
		items: [
			{
				id: uuidv4(),
				title: "Object Oriented Concepts",
				description: "Deep dive into object-oriented programming principles and design patterns.",
				priority: "low",
				deadline: 50,
				tags: [
					{ title: "Programming", ...getRandomColors() },
					{ title: "Design Patterns", ...getRandomColors() },
				],
			},
			{
				id: uuidv4(),
				title: "E-commerce Website Backend",
				description: "Build and integrate the backend services for an e-commerce platform.",
				priority: "medium",
				deadline: 50,
				tags: [
					{ title: "Backend", ...getRandomColors() },
					{ title: "API", ...getRandomColors() },
				],
			},
		],
	},
	done: {
		name: "Done",
		items: [
			{
				id: uuidv4(),
				title: "Tree Traversal Algorithms",
				description: "Implement and test various tree traversal algorithms.",
				priority: "high",
				deadline: 50,
				image: taskImage,
				alt: "task image",
				tags: [
					{ title: "Algorithms", ...getRandomColors() },
					{ title: "Data Structures", ...getRandomColors() },
				],
			},
		],
	},
};
