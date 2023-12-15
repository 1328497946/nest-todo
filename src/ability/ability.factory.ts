import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entity/user.entity';
import { Action } from './interface';
import {
  AbilityBuilder,
  ExtractSubjectType,
  InferSubjects,
  MongoAbility,
  createMongoAbility,
} from '@casl/ability';
import { Role } from 'src/user/interface';
import { ForbiddenError } from '@casl/ability';

export type Subjects = InferSubjects<typeof User> | 'all';

export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
  defineAbility(user: User) {
    const { can, build } = new AbilityBuilder(createMongoAbility);
    if (user.role === Role.Admin) {
      can(Action.Manage, 'all');
    } else {
      can(Action.Read, User, { user_id: user.user_id });
      can(Action.Update, User, { user_id: user.user_id });
    }
    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}

ForbiddenError.setDefaultMessage('没有权限');

export { ForbiddenError };
