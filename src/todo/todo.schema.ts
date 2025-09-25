import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Schema as MongooseSchema } from 'mongoose';
import { Auth } from 'src/auth/auth.schema';

@Schema({ timestamps: true })


export class Todo extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Auth' })
  user: Auth;  

  @Prop({ required: true })
  todo: string;


}

export const TodoSchema = SchemaFactory.createForClass(Todo);
