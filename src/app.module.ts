import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book/book.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'vijay',
      database: process.env.DATABASE_NAME,
      entities: [Book],
      synchronize: true,
    }),
    BookModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
