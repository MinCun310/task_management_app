import { ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async register(registerUserDto: RegisterUserDto): Promise<User> {
        const { email, password } = registerUserDto;

        let username = email.split('@')[0];
        username = username.toLowerCase();

        const salt = await bcrypt.genSalt(); // dùng để ẩn giá trí password
        const hashedPassword = await bcrypt.hash(password, salt); // mã hóa password

        const user = this.userRepository.create({ email, password: hashedPassword, username });
        try {
            return await this.userRepository.save(user);
        } catch (error) {
            if (error.code === '23505') { //duplicate email
                throw new ConflictException('Email already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
        const { email, password } = loginUserDto;
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new HttpException('Email is not exist', HttpStatus.UNAUTHORIZED);
        }
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            throw new HttpException('Password is incorrect', HttpStatus.UNAUTHORIZED);
        }
        if (user && checkPassword) {
            const payload: JwtPayload = { email };
            const accessToken = this.jwtService.sign(payload);
            return { accessToken };
        }
    }
}
