import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.entity';
import { title } from 'process';
import { CreateBookDto } from './dtos/create-book.dto';

@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @Get()
    async getBooks(): Promise<Book[]> {
        return await this.bookService.getAllBooks();
    }

    @Get(':id')
    async getBookById(@Param('id') id: number): Promise<Book> {
        return await this.bookService.getBookById(id);
    }

    @Post()
    async createBook (@Body() body: CreateBookDto): Promise<Book> {
        return await this.bookService.addBook(body);
    }

    @Put(':id')
    async updateBook (@Param('id') id: number, @Body() body: CreateBookDto): Promise<Book> {
        return await this.bookService.updateBook(id, body);
    }

    @Delete(':id')
    async deleteBookById(@Param('id') id: number): Promise<Book> {
        return await this.bookService.deleteBookById(id);
    }

}
