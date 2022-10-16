import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  let testEmail: string = 'test@test.com';
  let testPassword: string = 'password123';

  beforeEach(async () => {
    // Create a fake (mock) copy of the users service
    const users: User[] = [];
    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 99999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signUp(testEmail, testPassword);

    // user entered password is not the same as password returned
    expect(user.password).not.toEqual(testPassword);

    // user password returned has a salt and hash
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with an email that is in use', async () => {
    await service.signUp(testEmail, 'password');

    await expect(service.signUp(testEmail, testPassword)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('throws an error if signs in is called with an unused email', async () => {
    await expect(service.signIn(testEmail, testPassword)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('throws an error if an invalid password is provided', async () => {
    await service.signUp(testEmail, 'differentPassword');

    await expect(service.signIn(testEmail, testPassword)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('returns a user if correct password is provided', async () => {
    await service.signUp(testEmail, testPassword);

    const user = await service.signIn(testEmail, testPassword);
    expect(user).toBeDefined();
  });
});
