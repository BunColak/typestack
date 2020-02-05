import { Field, ID, InterfaceType } from "type-graphql";
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@InterfaceType()
export default class BaseModel {
    @PrimaryGeneratedColumn()
    @Field(type => ID)
    id: number;

    @CreateDateColumn()
    @Field(type => Date)
    createdAt: number;

    @UpdateDateColumn()
    @Field(type => Date)
    updatedAt: number;
}