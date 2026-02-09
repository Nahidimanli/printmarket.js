import { Controller, Get, Post, Body, Param, Put, UseGuards } from '@nestjs/common';
import { StudiosService } from './studios.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('studios')
@Controller('studios')
export class StudiosController {
    constructor(private studiosService: StudiosService) { }

    @Get()
    @ApiOperation({ summary: 'Get all studios' })
    async findAll() {
        return this.studiosService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get studio by id' })
    async findOne(@Param('id') id: string) {
        return this.studiosService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @ApiOperation({ summary: 'Update studio profile' })
    async update(@Param('id') id: string, @Body() data: any) {
        return this.studiosService.update(+id, data);
    }
}
