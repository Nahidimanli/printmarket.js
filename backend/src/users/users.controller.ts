import { Controller, Get, UseGuards, Request, NotFoundException, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
    private readonly logger = new Logger(UsersController.name);

    constructor(private usersService: UsersService) { }

    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get current user profile' })
    async getProfile(@Request() req) {
        this.logger.log(`📡 GET /users/me - User ID from JWT: ${req.user?.userId}`);

        if (!req.user || !req.user.userId) {
            this.logger.error('❌ No user ID in request');
            throw new NotFoundException('User not found in token');
        }

        const user = await this.usersService.findById(req.user.userId);

        if (!user) {
            this.logger.error(`❌ User not found in database: ID ${req.user.userId}`);
            throw new NotFoundException('User not found');
        }

        const { password, ...result } = user;
        this.logger.log(`✅ Returning user data: ${result.username} (${result.email})`);
        return result;
    }
}
