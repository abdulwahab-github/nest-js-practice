import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Auth } from './auth.schema';
import { Model } from 'mongoose';

type User = {
  id: number;
  username: string;
  password: string;
};
@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth.name) private userModel: Model<Auth>) {}

  async register(username: string, password: string) {
    const existing = await this.userModel.findOne({ username });
    if (existing) {
      return { message: 'User already exists' };
    }

    console.log('Registering user:', username);
    

    const hashed = await bcrypt.hash(password, 10);
    const createdUser = new this.userModel({ username, password: hashed });
    await createdUser.save();

    return { id: createdUser._id, username: createdUser.username };
  }

  getAllUsers() {
    return this.userModel.find().select('-password'); // password hide
  }
}
