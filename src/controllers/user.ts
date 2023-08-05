import  {Request, Response} from 'express'
import {UserService} from '../services';

class UserController {
    
    //Getting all users
    public getUsers = async (req:Request, res: Response) => {
        const users = await UserService.getAll(req, res);

        if (!users){
            return res.status(404).send({
                status: 'NOT_FOUND',
                message: `User not found.`
            });

        }
        res.status(200).json({
            status: 'OK',
            users,
        });
    };
 
    //Registering a new user
    public registerUsers = async (req: Request, res: Response) => {
        const { firstName, lastName, userName, email, password } = req.body;
        // console.log(userData)

        try {
            const user = await UserService.Register(
                firstName,
                lastName,
                userName,
                email,
                password
            );

            //create a token
            //const token = createToken(user.id);

            res.status(200).json({
                msg: 'successful registration',
                user,
                // token,
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    //Logging in a user
    public loginUsers = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        try {
            const user = await UserService.Login(email, password);

            // create a token
            // const token = createToken(user.id);

            res.status(200).json({
                msg: 'Logged In Successfully',
                email,
                // token,
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}

export default new UserController();