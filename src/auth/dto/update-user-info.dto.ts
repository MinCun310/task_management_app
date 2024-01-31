import { IsString } from "class-validator";


export class UpdateUserInfoDto{
    @IsString()
    firstName:string;

    @IsString()
    lastName:string;

}