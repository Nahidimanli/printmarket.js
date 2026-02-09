import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { StudioProfile, Prisma } from '@prisma/client';

@Injectable()
export class StudiosService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.studioProfile.findMany({
            include: { services: true }
        });
    }

    async findOne(id: number) {
        return this.prisma.studioProfile.findUnique({
            where: { id },
            include: { services: true }
        });
    }

    async create(data: Prisma.StudioProfileCreateInput) {
        return this.prisma.studioProfile.create({ data });
    }

    async update(id: number, data: Prisma.StudioProfileUpdateInput) {
        return this.prisma.studioProfile.update({
            where: { id },
            data,
        });
    }
}
