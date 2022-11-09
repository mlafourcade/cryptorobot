import { TasksService } from './tasks/shared/tasks.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebsocketService } from './websocket/websocket.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://mlafourcade:xXugqpTxalizGWHK@cluster0.931bp.mongodb.net/UserRegister?retryWrites=true&w=majority',
    ),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService, WebsocketService, TasksService],
})
export class AppModule {}
