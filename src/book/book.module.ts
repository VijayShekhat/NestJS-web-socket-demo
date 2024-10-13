import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { BookGateway } from './book.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [BookService, BookGateway],
  controllers: [BookController]
})
export class BookModule {}
