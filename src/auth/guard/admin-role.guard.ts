import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
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
        // const auth = request && request.rawHeaders;
        // let authToken = ''
        // auth && auth[0] && auth.map((element : any) => {
        //     let tempArr = element.split(" ");
        //     if(tempArr[0] === "Bearer" && tempArr[1]) {
        //         authToken = tempArr[1]
        //     }    
        // })

        const {headers} = request;
        
        if (!headers.authorization) {
            throw new UnauthorizedException("Token not found.")
            /** throw new Error("Token not found");*/
          }
          let authorizationToken = headers.authorization;
      
          if (headers.authorization.includes("Bearer ")) {
            authorizationToken = headers.authorization.replace('Bearer ', '');
          }

        const userInformation : any = await this.jwtService.decode(authorizationToken)
        if(userInformation.role === 'ADMIN'){
            return true
        }
        return false

        // throw new Error("Method not implemented.");
    } 
}