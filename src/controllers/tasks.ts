import { db } from '../database/connectDB.ts';
import { TaskSchema } from '../schema/task.ts';
import { ObjectId } from '@db/mongo';

const tasks = db.collection<TaskSchema>('tasks');

export const create = async ({
	request,
	response,
}: {
	request: any;
	response: any;
}) => {
	const { name, isCompleted } = await request.body.json();

	const _id = await tasks.insertOne({
		name,
		isCompleted,
	});
	response.body = {
		message: 'Task Created',
		id: _id,
		name: name,
		Completed: isCompleted,
	};
};

export const getTasks = async ({ response }: { response: any }) => {
	const allTasks = await tasks.find({}).toArray();
	response.status = 200;
	response.body = { tasks: allTasks };
};

export const getById = async ({
	params,
	response,
}: {
	params: { taskId: string };
	response: any;
}) => {
	const taskId = params.taskId;
	const task = await tasks.findOne({ _id: new ObjectId(taskId) });
	if (!task) {
		response.body = { message: `Task with id ${taskId} not found` };
		response.status = 404;
		return;
	}
	response.status = 200;
	response.body = { task: task };
};

export const updateById = async ({
	params,
	request,
	response,
}: {
	params: { taskId: string };
	request: any;
	response: any;
}) => {
	const taskId = params.taskId;
	const { name, isCompleted } = await request.body.json();
	const task = await tasks.updateOne(
		{ _id: new ObjectId(taskId) },
		{ $set: { name: name, isCompleted: isCompleted } }
	);
	response.status = 200;
	request.body = { message: 'Task updated', task: task };
};

export const deleteTask = async ({
	params,
	response,
}: {
	params: { taskId: string };
	response: any;
}) => {
	const taskId = params.taskId;
	const task = await tasks.deleteOne({ _id: new ObjectId(taskId) });
	response.status = 200;
	response.body = { message: 'Task deleted', task: task };
};
