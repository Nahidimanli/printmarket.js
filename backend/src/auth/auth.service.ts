import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
                email: user.email,
                phone_number: user.phone_number
            }
        };
    }

    async register(userData: any) {
        return this.usersService.create(userData);
    }

    async googleLogin(req: any) {
        if (!req.user) {
            throw new UnauthorizedException('No user from google');
        }

        let user = await this.usersService.findByEmail(req.user.email);

        if (!user) {
            // Create user if not exists
            user = await this.usersService.create({
                email: req.user.email,
                username: req.user.email.split('@')[0] + Math.floor(Math.random() * 1000), // Generate a random username
                password: '', // Password not needed for social login
            });
        }

        return this.login(user);
    }
}
