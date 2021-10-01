import {Entity, Column, PrimaryColumn} from "typeorm";

@Entity()
export class User {

    @PrimaryColumn({unique: true})
    id: string;

    @Column({unique: true})
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;
}
