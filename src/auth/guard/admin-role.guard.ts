import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserService } from "src/user/user.service";
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from "src/user/dto/user.dto";

@Injectable()
export class AdminRoleGuard implements CanActivate {
    constructor(
        private userService : UserService,
        private jwtService : JwtService
    ){}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const auth = request && request.rawHeaders;
        let authToken = ''
        auth && auth[0] && auth.map((element : any) => {
            let tempArr = element.split(" ");
            if(tempArr[0] === "Bearer" && tempArr[1]) {
                authToken = tempArr[1]
            }    
        })

        const userInformation : any = await this.jwtService.decode(authToken)
        if(userInformation.role === 'ADMIN'){
            return true
        }
        return false

        // throw new Error("Method not implemented.");
    } 
}