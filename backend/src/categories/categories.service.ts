import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Category, Prisma } from '@prisma/client';

@Injectable()
export class CategoriesService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.category.findMany({
            include: { children: true }
        });
    }

    async findOne(id: number) {
        return this.prisma.category.findUnique({
            where: { id },
            include: { children: true, services: true }
        });
    }
}
