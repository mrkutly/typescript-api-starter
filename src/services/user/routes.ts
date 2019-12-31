import { Request, Response } from 'express';
import dotenv from 'dotenv';
import {
	checkUserParams,
	checkLoginCredentials,
	checkUserDoesNotExist,
	checkResetRequestParams,
	checkPasswordResetToken
} from '../../middleware/checks';
import { User } from './entity';
import * as TokenManager from '../../utils/TokenManager';
import * as Mailer from '../../utils/Mailer';
import Logger from '../../utils/Logger';

dotenv.config();

const userRoutes = [
	{
		path: "/api/v1/signup",
		method: "post",
		handler: [
			checkUserParams,
			checkUserDoesNotExist,
			async ({ body }: Request, res: Response): Promise<void> => {
				const { email, password } = body;
				const user = new User();

				user.email = email;
				user.password = password;

				await user.save();
				const token = TokenManager.makeToken(user);
				res.status(201).json({ token });
			}
		]
	},
	{
		path: "/api/v1/login",
		method: "post",
		handler: [
			checkUserParams,
			checkLoginCredentials,
			async (req: Request, res: Response): Promise<void> => {
				const token = TokenManager.makeToken(req.user);
				res.status(200).json({ token });
			}
		]
	},
	{
		path: "/api/v1/request-reset",
		method: "post",
		handler: [
			checkResetRequestParams,
			async (req: Request, res: Response): Promise<void> => {
				const { email } = req.body;

				const { affected, resetToken } = await User.setResetTokenWhereEmail(email);

				if (affected === 1) {
					// email them the reset token
					const mailSentSuccessfully = await Mailer.sendPasswordResetEmail(email, resetToken);

					if (!mailSentSuccessfully) {
						Logger.warn(`api.mailer.rejected - ${email}`);
					}
				}

				res.status(200).json({ message: `An email will be sent to ${email}` });
			}
		]
	},
	{
		path: "/api/v1/reset-password",
		method: "post",
		handler: [
			checkPasswordResetToken,
			async (req: Request, res: Response): Promise<void> => {
				const { user } = req;
				const { password } = req.body;
				await user.hashPassword(password);
				await user.save();

				const token = TokenManager.makeToken(user);
				res.status(200).json({ message: "Password successfully reset", token });
			}
		]
	}
];

export default userRoutes;