import { Request, Response } from "express";
import { UserRepository } from "../repositories";
import { User } from "../models/user";
import bcrypt = require('bcrypt');
const validator = require('validator');

class UserService {
    private readonly userRepository: typeof UserRepository;

    constructor(){
        this.userRepository = UserRepository;
    }

    //getting all users
    public getAll = async (req: Request, res: Response) :Promise<User[]> => {
        const users = await this.userRepository.find();
        return users;
    };

    //Creating a new user
    public Register = async (firstName, lastName, userName, email, password) => {
        if (!firstName || !lastName || !userName ||  !email || !password) {
            throw Error('All fields must be filled');
        }
        if (!validator.isEmail(email)) {
            throw Error('Email not valid');
        }
        //   if (!validator.isStrongPassword(password)) {
        //     throw Error('Password not strong enough')
        //   }

        const exists = await this.userRepository.findOne({
            where: { email: email },
        });
        if (exists) {
            throw Error('Email already in use');
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const user = await this.userRepository.create({
            firstName,
            lastName,
            userName,
            email,
            password: hash,
        });
        const savedUser = await this.userRepository.save(user);

        return user;
    };

    //logging in a user
    public Login = async (email, password) => {
        if (!email || !password) {
            throw Error('All fields must be filled');
        }

        const user = await this.userRepository.findOne({
            where: { email: email },
        });

        if (!user) {
            throw Error('Incorrect email');
        }

        const match = await bcrypt.compare(password, user.password);
        console.log(user);
        if (!match) {
            throw Error('Incorrect password');
        }

        return user;
    };

}

export default new UserService();