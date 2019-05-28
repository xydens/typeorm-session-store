import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class SessionEntity {

    @PrimaryColumn()
    sid: string;

    @Column("simple-json")
    data: Express.SessionData;

}
