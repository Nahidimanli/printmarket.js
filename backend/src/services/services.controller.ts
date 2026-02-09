import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('services')
@Controller('services')
export class ServicesController {
    constructor(private servicesService: ServicesService) { }

    @Get()
    @ApiOperation({ summary: 'Get all services' })
    async findAll(
        @Query('categoryId') categoryId?: string,
        @Query('studioId') studioId?: string
    ) {
        return this.servicesService.findAll(
            categoryId ? +categoryId : undefined,
            studioId ? +studioId : undefined
        );
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get service by id' })
    async findOne(@Param('id') id: string) {
        return this.servicesService.findOne(+id);
    }
}
