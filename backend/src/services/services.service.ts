import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Service, Prisma } from '@prisma/client';

@Injectable()
export class ServicesService {
    constructor(private prisma: PrismaService) { }

    async findAll(categoryId?: number, studioId?: number) {
        return this.prisma.service.findMany({
            where: {
                ...(categoryId ? { categoryId } : {}),
                ...(studioId ? { studioId } : {}),
            },
            include: { studio: true, category: true }
        });
    }

    async findOne(id: number) {
        return this.prisma.service.findUnique({
            where: { id },
            include: { studio: true, category: true }
        });
    }

    async create(data: Prisma.ServiceCreateInput) {
        return this.prisma.service.create({ data });
    }
}
