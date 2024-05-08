import { SetMetadata } from '@nestjs/common';
import { AppAction, AppSubjects } from '../role/role.service';

export interface PermissionMetadata {
  action: AppAction;
  subject: AppSubjects;
}

export const PERMISSION_METADATA_KEY = 'permissions';

export const Permission = (action: AppAction, subject: AppSubjects) =>
  SetMetadata<string, PermissionMetadata>(PERMISSION_METADATA_KEY, {
    action,
    subject,
  });
