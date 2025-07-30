import {
    Table,
    Column,
    Model,
    DataType,
    AutoIncrement,
    PrimaryKey,
    AllowNull,
    Default,
} from 'sequelize-typescript';

@Table({ tableName: 'otp_codes' })
export class OtpCode extends Model<OtpCode> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    phone: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    code: string;

    @AllowNull(false)
    @Column(DataType.DATE)
    expiresAt: Date;

    @Default(false)
    @Column(DataType.BOOLEAN)
    isUsed: boolean;
}