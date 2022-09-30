import { SetMetadata } from '@nestjs/common';

export const DisableAccessToken = () => SetMetadata('allowAccessToken', true);
