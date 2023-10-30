import { Injectable } from '@nestjs/common';

import { AuthGuard as PassAuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends PassAuthGuard('local') {}
