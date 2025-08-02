import { Inject, Injectable } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { OpeningHour } from './entites/opening_hour.entity';
import { OpeningHourEnum } from 'src/common/utils/validateAndParseOpeningHours';
import { DayOfWeek } from 'src/common/enums/day_of_week';

@Injectable()
export class OpeningHourService {
  constructor(
    @Inject(repositories.openingHour_repository)
    private openingHourRepo: typeof OpeningHour,
  ) {}

  async createOpiningHourForStore(storeId: number, hours: OpeningHourEnum[]) {
    const records = hours.map((hour) => ({
      storeId,
      day: hour.day as DayOfWeek, // تأكدنا من النوع
      openTime: hour.openTime,
      closeTime: hour.closeTime,
    }));

    await this.openingHourRepo.bulkCreate(records);
  }
}
