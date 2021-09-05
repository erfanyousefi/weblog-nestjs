import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(User)
export class ProfileRepository extends Repository<User>{

}