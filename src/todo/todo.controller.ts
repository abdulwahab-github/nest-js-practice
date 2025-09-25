import { Body, Controller, Param, Post } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('create')
  async createTodo(@Body() body: { userId: string; todo: string }) {
    return this.todoService.createTodo(body.userId, body.todo);
  }

  @Post('user-todos/:userId')
  async getUserTodos(@Param() params: { userId: string }) {
    return this.todoService.getTodosByUser(params.userId);
  }

  @Post('delete')
  async deleteTodo(@Body() body: { todoId: string; userId: string }) {
    return this.todoService.deleteTodo(body.todoId, body.userId);
  }
}
