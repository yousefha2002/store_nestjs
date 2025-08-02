import { Sequelize } from 'sequelize-typescript';
import { Admin } from '../modules/admin/entities/admin.entity';
import { Cart } from 'src/modules/cart/entities/cart.entity';
import { CartItem } from 'src/modules/cart_item/entities/cart_item.entity';
import { CartItemExtra } from 'src/modules/cart_item_extra/entities/cart_item.entity';
import { CartItemInstruction } from 'src/modules/cart_item_instruction/entities/cart_item_instruction.entity';
import { CartItemVariant } from 'src/modules/cart_item_variant/entities/cart_item_variant.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { Customer } from 'src/modules/customer/entities/customer.entity';
import { Offer } from 'src/modules/offer/entities/offer.entity';
import { OpeningHour } from 'src/modules/opening_hour/entites/opening_hour.entity';
import { OtpCode } from 'src/modules/otp_code/entities/otp_code.entity';
import { Owner } from 'src/modules/owner/entities/owner.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { ProductExtra } from 'src/modules/product_extra/entities/product_extra.entity';
import { ProductImage } from 'src/modules/product_image/entities/product_image.entity';
import { ProductInstruction } from 'src/modules/product_instruction/entities/product_instruction.entity';
import { ProductVariant } from 'src/modules/prouduct_variant/entities/prouduct_variant.entity';
import { Store } from 'src/modules/store/entities/store.entity';
import { Type } from 'src/modules/type/entities/type.entity';
import { TypeLanguage } from 'src/modules/type/entities/type_language.entity';
import { Address } from 'src/modules/address/entities/address.entity';
import { Car } from 'src/modules/car/entities/car.entity';
import { WalletTransaction } from 'src/modules/wallet_transaction/entities/wallet_transaction.entity';
import { Order } from 'src/modules/order/entities/order.entity';
import { OrderItem } from 'src/modules/order_item/entities/order_item.entity';
import { OrderItemExtra } from 'src/modules/order_item_extra/entities/order_item_extra.entity';
import { OrderItemVariant } from 'src/modules/order_item_variant/entities/order_item_variant.entity';
import { OrderItemInstruction } from 'src/modules/order_item_instruction/entities/order_item_instruction.entity';
import { Gift } from 'src/modules/gift/entities/gift.entity';
import { Avatar } from 'src/modules/avatar/entities/avatar.entity';
import { CarType } from 'src/modules/car_type/entites/car_type.entity';
import { CarColor } from 'src/modules/car_color/entities/car_color.entity';
import { CarBrand } from 'src/modules/car_brand/entities/car_brand.entity';
import { CarModel } from 'src/modules/car_model/entites/car_model.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        // password: '2838293yo',
        password: '059283805928388',
        database: 'store_db',
      });
      sequelize.addModels([
        Admin,
        Cart,
        CartItem,
        CartItemExtra,
        CartItemInstruction,
        CartItemVariant,
        Category,
        Customer,
        Offer,
        Order,
        OrderItem,
        OrderItemExtra,
        OrderItemVariant,
        OrderItemInstruction,
        OpeningHour,
        OtpCode,
        Owner,
        Product,
        ProductExtra,
        ProductImage,
        ProductInstruction,
        ProductVariant,
        Store,
        Type,
        TypeLanguage,
        Address,
        Car,
        WalletTransaction,
        Gift,
        Avatar,
        CarType,
        CarColor,
        CarBrand,
        CarModel,
      ]);
      await sequelize.sync({ alter: false });
      return sequelize;
    },
  },
];
