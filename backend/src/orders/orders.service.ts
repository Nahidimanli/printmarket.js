import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Order, Prisma } from '@prisma/client';

@Injectable()
export class OrdersService {
    constructor(private prisma: PrismaService) { }

    async create(data: Prisma.OrderCreateInput) {
        return this.prisma.order.create({
            data,
            include: { items: true }
        });
    }

    async findAll(userId: number, role: string) {
        if (role === 'ADMIN') {
            return this.prisma.order.findMany({ include: { customer: true, studio: true, items: true } });
        }
        if (role === 'STUDIO') {
            return this.prisma.order.findMany({
                where: { studio: { userId } },
                include: { customer: true, items: true }
            });
        }
        return this.prisma.order.findMany({
            where: { customerId: userId },
            include: { studio: true, items: true }
        });
    }

    async findOne(id: number) {
        return this.prisma.order.findUnique({
            where: { id },
            include: { customer: true, studio: true, items: { include: { service: true } }, files: true }
        });
    }
}
