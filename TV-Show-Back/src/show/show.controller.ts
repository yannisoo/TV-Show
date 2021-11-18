import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  UseGuards,
  Req,
  Param
} from '@nestjs/common';

import { ShowService } from './show.service';
import { ShowDTO } from './show.dto';
import { AuthGuard } from '../shared/auth.guard';

@Controller('show')
@UseGuards(new AuthGuard())
export class ShowController {
  constructor(private showService: ShowService) {}

  @Get('/')
  getAllShows(@Req() req) {
    const userId = req.user.id;
    return this.showService.getAllShows(userId);
  }
  @Get('/:id')
  isItSaved(@Req() req, @Param('id') id: string) {
    const userId = req.user.id;
    return this.showService.isItSaved(userId, id);
  }

  @Post('/')
  createShow(
    @Req() req,
    @Body('showId') showId: Extract<ShowDTO, 'showId'>,
    @Body('seen') seen: Extract<ShowDTO, 'seen'>
  ) {
    const userId = req.user.id;
    return this.showService.createShow(userId, showId, seen);
  }

  @Patch('/:id')
  updateShow(@Req() req, @Param('id') id: string) {
    const userId = req.user.id;
    return this.showService.updateShow(userId, id);
  }

  @Delete('/:id')
  deleteShow(@Req() req, @Param('id') id: string) {
    const userId = req.user.id;
    return this.showService.deleteShow(userId, id);
  }
}
