import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { AdminModule } from './modules/admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
import { CategoryModule } from './modules/category/category.module';
import { LevelModule } from './modules/level/level.module';
import { QuizModule } from './modules/quiz/quiz.module';
import { QuestionModule } from './modules/question/question.module';
import { AnswerModule } from './modules/answer/answer.module';
import { AttemptModule } from './modules/attempt/attempt.module';
import { CertificateModule } from './modules/certificate/certificate.module';
import { PointsModule } from './modules/points/points.module';
import { LevelProgressModule } from './modules/level-progress/level-progress.module';
import { AttemptAnswerModule } from './modules/attempt-answer/attempt-answer.module';
import { StatisticModule } from './modules/statistic/statistic.module';
import { OwnerModule } from './modules/owner/owner.module';
import { StoreModule } from './modules/store/store.module';
import { StoreCategoryModule } from './modules/store_category/store_category.module';
import { PickupMethodModule } from './modules/pickup_method/pickup_method.module';
import { OpeningHourModule } from './modules/opening_hour/opening_hour.module';
import { ProductModule } from './modules/product/product.module';
import { ProductImageModule } from './modules/product_image/product_image.module';
import { TypeModule } from './modules/type/type.module';
import { ProductTypeModule } from './modules/product_type/product_type.module';
import { ProductExtraModule } from './modules/product_extra/product_extra.module';
import { ProudctVariantModule } from './modules/proudct_variant/proudct_variant.module';
import { ProuductVariantModule } from './modules/prouduct_variant/prouduct_variant.module';
import { ProductInstructionModule } from './modules/product_instruction/product_instruction.module';

@Module({
    imports: [
        JwtModule.register({ global: true, secret: 'token' }),
        DatabaseModule,
        UserModule,
        AdminModule,
        CategoryModule,
        LevelModule,
        QuizModule,
        QuestionModule,
        AnswerModule,
        AttemptModule,
        CertificateModule,
        PointsModule,
        LevelProgressModule,
        AttemptAnswerModule,
        StatisticModule,
        OwnerModule,
        StoreModule,
        StoreCategoryModule,
        PickupMethodModule,
        OpeningHourModule,
        ProductModule,
        ProductImageModule,
        TypeModule,
        ProductTypeModule,
        ProductExtraModule,
        ProudctVariantModule,
        ProuductVariantModule,
        ProductInstructionModule,
    ]
})
export class AppModule {}