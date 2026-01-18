import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { CreateOnboardingDto } from './dto/create-onboarding.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Onboarding')
@ApiBearerAuth('jwt')
@Controller('onboarding')
export class OnboardingController {
  constructor(private readonly service: OnboardingService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: CreateOnboardingDto })
  @Post()
  create(@Body() dto: CreateOnboardingDto) {
    return this.service.create(dto);
  }
}
