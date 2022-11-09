import mongoose from 'mongoose';

export const userData = new mongoose.Schema({
  description: String,
  completion: Boolean,
});

/*import { model, Schema, Types, Model, Document } from 'mongoose';




export interface IUser extends Document {
  _id: Types.ObjectId;
  email: String;
  username: String;
  lastname: String;
  userpass: String;
  imguser: String;
}

const UserData: Schema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  lastname: { type: String, required: true },
  userpass: { type: String, required: true },
  imguser: { type: String, required: false },
});

export const User: Model<IUser> = model('userdata', UserData);*/
