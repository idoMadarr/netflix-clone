import { UserModel } from '../../models/UserModel';

declare global{
    namespace Express {
        interface Request {
            currentUser: UserModel
        }
    }
}