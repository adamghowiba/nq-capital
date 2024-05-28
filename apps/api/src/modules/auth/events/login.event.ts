import { UserEntity } from "@nq-capital/iam";

export class LoginEvent extends UserEntity {
  constructor(params: LoginEvent) {
    super();
    Object.assign(this, params);
  }
}
