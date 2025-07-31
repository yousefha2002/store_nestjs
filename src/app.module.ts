import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { CartModule } from './modules/cart/cart.module';
import { CartItemModule } from './modules/cart_item/cart_item.module';
import { CartItemExtraModule } from './modules/cart_item_extra/cart_item_extra.module';
import { CartItemInstructionModule } from './modules/cart_item_instruction/cart_item_instruction.module';
import { CartItemVariantModule } from './modules/cart_item_variant/cart_item_variant.module';
import { OpeningHourModule } from './modules/opening_hour/opening_hour.module';
import { CategoryModule } from './modules/category/category.module';
import { CustomerModule } from './modules/customer/customer.module';
import { OfferModule } from './modules/offer/offer.module';
import { OtpCodeModule } from './modules/otp_code/otp_code.module';
import { OwnerModule } from './modules/owner/owner.module';
import { PickupMethodModule } from './modules/pickup_method/pickup_method.module';
import { ProductModule } from './modules/product/product.module';
import { ProductExtraModule } from './modules/product_extra/product_extra.module';
import { ProductImageModule } from './modules/product_image/product_image.module';
import { ProductInstructionModule } from './modules/product_instruction/product_instruction.module';
import { ProuductVariantModule } from './modules/prouduct_variant/prouduct_variant.module';
import { StoreModule } from './modules/store/store.module';
import { TypeModule } from './modules/type/type.module';
import { AdminModule } from './modules/admin/admin.module';
import { OrderModule } from './modules/order/order.module';
import { OrderItemModule } from './modules/order_item/order_item.module';
import { OrderItemExtraModule } from './modules/order_item_extra/order_item_extra.module';
import { OrderItemVariantModule } from './modules/order_item_variant/order_item_variant.module';
import { OrderItemInstructionModule } from './modules/order_item_instruction/order_item_instruction.module';
import { AddressModule } from './modules/address/address.module';
import { CarModule } from './modules/car/car.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { WalletTransactionModule } from './modules/wallet_transaction/wallet_transaction.module';
import { GiftModule } from './modules/gift/gift.module';

import { MulterConfigService } from './multer/multer.config';
import { MulterModule } from '@nestjs/platform-express';
import { AvatarModule } from './modules/avatar/avatar.module';
import { I18nModule, QueryResolver, HeaderResolver } from 'nestjs-i18n';
import * as path from 'path';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.resolve(process.cwd(), 'src/i18n'),
        watch: false,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang', 'locale'] }, // يدعم lang=en أو lang=ar في URL
        new HeaderResolver(['accept-language']), // أو من الهيدر
      ],
    }),
    JwtModule.register({ global: true, secret: 'token' }),
    DatabaseModule,
    AdminModule,
    AppModule,
    CartModule,
    CartItemModule,
    CartItemExtraModule,
    CartItemInstructionModule,
    CartItemVariantModule,
    CategoryModule,
    CustomerModule,
    OfferModule,
    OpeningHourModule,
    OtpCodeModule,
    OwnerModule,
    PickupMethodModule,
    ProductModule,
    ProductExtraModule,
    ProductImageModule,
    ProductInstructionModule,
    ProuductVariantModule,
    StoreModule,
    TypeModule,
    OrderModule,
    OrderItemModule,
    OrderItemExtraModule,
    OrderItemVariantModule,
    OrderItemInstructionModule,
    AddressModule,
    CarModule,
    WalletModule,
    WalletTransactionModule,
    GiftModule,
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
    AvatarModule,
  ],
  providers: [MulterConfigService],
})
export class AppModule {}
