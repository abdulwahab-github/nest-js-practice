import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './todo.schema';
import { Model } from 'mongoose';

@Injectable()
export class TodoService {
     constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}
   

     async createTodo(userId: string, todo: string) {
         const createdTodo = new this.todoModel({ user: userId, todo });
         await createdTodo.save();
         return createdTodo;
     }


        async getTodosByUser(userId: string) {
            const todos = await this.todoModel.find({ user: userId });
            return todos;
        }

        async deleteTodo(todoId: string, userId: string) {

            const result = await this.todoModel.deleteOne({ _id: todoId, user: userId });
            return result.deletedCount > 0;
        }



}
