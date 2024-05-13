import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Users } from './entities/user.entity';
import { RedisService } from 'src/redis/redis.service';
import { CreateUserDto, UpdateUserDto, SignInDto, SignUpDto, UpdatePasswordDto, UpdateAccessTokenDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    private jwtService: JwtService,
    private redisService: RedisService,
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async user_signup(signUpDto: SignUpDto): Promise<Object> {
    const [ user ] = await this.userRepository.findBy({ username: signUpDto.username });

    if (user) return { status: HttpStatus.CONFLICT, message: "Username already exists" } 

    const hashed_password = await bcrypt.hash(signUpDto.password, 7);

    const newUser = await this.userRepository.save({ username: signUpDto.username, hashed_password });

    const tokens = await this.getTokens(newUser);

    await this.userRepository.update({ id: newUser.id }, { ...tokens });

    const redisMessage = await this.redisService.set({ key: String(newUser.id), value: tokens.accessToken });

    const [ addedTokenUser ] = await this.userRepository.findBy({ username: newUser.username });
    
    return { status: HttpStatus.CREATED, newUser: addedTokenUser, redisMessage };
  }

  async user_signin(signInDto: SignInDto): Promise<Object> {
    const [ user ] = await this.userRepository.findBy({ username: signInDto.username });

    if (!user) return { status: HttpStatus.NOT_FOUND, message: "User not found" };

    const tokens = await this.getTokens(user);

    await this.userRepository.update({ id: user.id }, { ...tokens });
    
    const redisMessage = await this.redisService.set({ key: String(user.id), value: tokens.accessToken });

    const [ signInUser ] = await this.userRepository.findBy({ username: signInDto.username });

    return { status: HttpStatus.OK, signInUser, redisMessage };
  }

  async user_signout(id: number): Promise<Object> {
    const [ signOutUser ] = await this.userRepository.findBy({ id });

    if (!signOutUser) return { status: HttpStatus.NOT_FOUND, message: 'User not found' };

    await this.userRepository.update({ id }, { accessToken: null, refreshToken: null });

    await this.redisService.del(`${signOutUser.id}`);

    return HttpStatus.OK;
  }

  async user_create(createUserDto: CreateUserDto): Promise<Object> {
    const [ user ] = await this.userRepository.findBy({ username: createUserDto.username });

    if (user) return { status: HttpStatus.CONFLICT, message: "Username already exists" } 

    const hashed_password = await bcrypt.hash(createUserDto.password, 7);

    const newUser = await this.userRepository.save({ username: createUserDto.username, hashed_password });

    const tokens = await this.getTokens(newUser);

    await this.userRepository.update({ id: newUser.id }, { ...tokens });

    return HttpStatus.CREATED;
  }

  async find_users(): Promise<Object> {
    const users = await this.userRepository.find();

    if (users.length === 0) return { status: HttpStatus.NOT_FOUND, message: 'Users not found' };

    return { status: HttpStatus.OK, users };
  }

  async find_user(id: number): Promise<Object> {
    const [ user ] = await this.userRepository.findBy({ id });

    if (!user) return { status: HttpStatus.NOT_FOUND, message: 'User not found' };

    return { status: HttpStatus.OK, user };
  }

  async update_user_data(id: number, updateUserDto: UpdateUserDto): Promise<Object> {
    const [ user ] = await this.userRepository.findBy({ id });

    if (!user) return { status: HttpStatus.NOT_FOUND, message: 'User not found' };

    await this.userRepository.update({ id }, { ...updateUserDto });

    const [ updateUser ] = await this.userRepository.findBy({ id });

    return { status: HttpStatus.OK, updateUser };
  }

  async update_user_pass(id: number, updatePasswordDto: UpdatePasswordDto ): Promise<Object> {
    const [ user ] = await this.userRepository.findBy({ id });

    if (!user) return { status: HttpStatus.NOT_FOUND, message: 'User not found' };

    const pass = await bcrypt.compare(updatePasswordDto.password, user.hashed_password);
    if (!pass) return { status: HttpStatus.UNAUTHORIZED, message: 'Wrong password' };
    
    if (updatePasswordDto.new_password != updatePasswordDto.confirm_password) 
    return { status: HttpStatus.UNAUTHORIZED, message: 'Confirm password error' };
    
    const hashed_password = await bcrypt.hash(updatePasswordDto.new_password, 7);

    await this.userRepository.update({ id }, { hashed_password });

    const [ updatePasswordUser ] = await this.userRepository.findBy({ id });

    return { status: HttpStatus.OK, updatePasswordUser };
  }

  async remove_user(id: number): Promise<Object | HttpStatus> {
    const [ user ] = await this.userRepository.findBy({ id });
        
    if(!user) return { status: HttpStatus.NOT_FOUND, message: 'User not found' };

    await this.userRepository.delete({ id });

    return HttpStatus.OK;
  }

  async update_user_access_token( id: number, updateAccessTokenDto: UpdateAccessTokenDto ) {
    const [ user ] = await this.userRepository.findBy({ id, refreshToken: updateAccessTokenDto.refreshToken });

    if (!user) return { status: HttpStatus.NOT_FOUND, message: 'User not found' };

    const tokens = await this.getTokens(user)

    await this.userRepository.update({ id }, { accessToken: tokens.accessToken });

    await this.redisService.del(`${user.id}`);

    const redisMessage = await this.redisService.set({ key: String(user.id), value: tokens.accessToken });

    const [ updateAccessTokenUser ] = await this.userRepository.findBy({ id });

    return { status: HttpStatus.OK, updateAccessTokenUser };
  }  

  async getTokens(user: Users) {
    console.log(user.id);
    
    const jwtPayload={ id: user.id };

    const [accessToken,refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload,{
        secret:process.env.ACCESS_TOKEN_KEY || 'MyAccesVery',
        expiresIn:process.env.ACCESS_TOKEN_TIME || '10h'
      }),

      this.jwtService.signAsync(jwtPayload,{
        secret:process.env.REFRESH_TOKEN_KEY || 'MyRefreshVery',
        expiresIn:process.env.REFRESH_TOKEN_TIME || '144h'
      }),
    ]);
        
    return { accessToken, refreshToken };  
  }
}