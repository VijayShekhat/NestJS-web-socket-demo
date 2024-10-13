import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { BookGateway } from './book.gateway';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>,
        private readonly bookGateway: BookGateway,
      ) {}
    
      async getAllBooks(): Promise<Book[]> {
        return this.bookRepository.find();
      }

      async getBookById(id: number): Promise<Book> {
        return this.bookRepository.findOne({ where: { id } });
      }
    
      async addBook(body: CreateBookDto): Promise<Book> {
        const newBook = this.bookRepository.create(body);
        this.bookGateway.handleAddBook({ action: 'create', newBook });
        return this.bookRepository.save(newBook);
      }
    
      async updateBook(id: number, body: UpdateBookDto): Promise<Book> {
        const book = await this.bookRepository.findOne({ where: { id } });
        if (book) {
          book.title = body.title;
          book.author = body.author;
          this.bookGateway.handleUpdateBook({ action: 'update', book: book });
          return this.bookRepository.save(book);
        }
        return null;
      }

      async deleteBookById(id: number): Promise<Book> {
        const book =  this.bookRepository.findOne({ where: { id } });
        this.bookRepository.delete(id)
        return book
      }
}
