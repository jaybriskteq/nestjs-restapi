import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KYE = 'isPublic';

export const Public = () => SetMetadata(IS_PUBLIC_KYE, true);
