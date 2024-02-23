import * as bcrypt from 'bcrypt';

export class Password {
	public static encrypt(password: string) {
		return bcrypt.hashSync(password, 10);
	}

	public static compare(plain: string, hashed: string) {
		return bcrypt.compare(plain, hashed);
	}
}