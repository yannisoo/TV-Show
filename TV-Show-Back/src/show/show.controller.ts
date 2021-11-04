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
import { AuthGuard } from 'src/shared/auth.guard';

@Controller('show')
@UseGuards(new AuthGuard())
export class ShowController {
  constructor(private showService: ShowService) {}

  @Get()
  getAllShows(@Req() req) {
    const userId = req.user.id;
    return this.showService.getAllShows(userId);
  }

  @Post()
  createShow(
    @Req() req,
    @Body('content') content: Extract<ShowDTO, 'content'>
  ) {
    const userId = req.user.id;
    return this.showService.createShow(userId, content);
  }

  @Patch(':id')
  updateShow(
    @Param('id') id: string,
    @Req() req,
    @Body() data: Partial<ShowDTO>
  ) {
    const userId = req.user.id;
    return this.showService.updateShow(userId, id, data);
  }

  @Delete()
  deleteShow(@Req() req, @Param('id') id: string) {
    const userId = req.user.id;
    return this.showService.deleteShow(userId, id);
  }
}
