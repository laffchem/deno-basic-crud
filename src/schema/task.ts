import { ObjectId } from '@db/mongo';

export interface TaskSchema {
	_id: ObjectId;
	name: string;
	isCompleted: boolean;
}
