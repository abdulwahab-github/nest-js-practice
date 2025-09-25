import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // env load karega
    MongooseModule.forRoot(process.env.MONGO_URI!), // mongo connect
    AuthModule, TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
