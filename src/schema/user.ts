import { ObjectId } from '@db/mongo';

export interface UserSchema {
	_id: ObjectId;
	username: string;
	password: string;
}
