import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new order' })
    async create(@Body() data: any, @Req() req: any) {
        // Basic mapping, in reality we'd use a DTO
        return this.ordersService.create({
            ...data,
            customer: { connect: { id: req.user.userId } }
        });
    }

    @Get()
    @ApiOperation({ summary: 'Get all orders for current user' })
    async findAll(@Req() req: any) {
        return this.ordersService.findAll(req.user.userId, req.user.role);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get order details' })
    async findOne(@Param('id') id: string) {
        return this.ordersService.findOne(+id);
    }
}
