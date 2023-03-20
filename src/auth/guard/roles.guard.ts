import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(
        private reflector : Reflector,
        private jwtService : JwtService
    ){}

    async canActivate(context : ExecutionContext):  Promise<boolean>  {
        const roles = this.reflector.get<string[]>('roles', context.getHandler())

        const requests = context.switchToHttp().getRequest();
        const {headers} = requests;
        
        if (!headers.authorization) {
            throw new UnauthorizedException("Token not found.")
            /** throw new Error("Token not found");*/
          }
          let authorizationToken = headers.authorization;
      
          if (headers.authorization.includes("Bearer ")) {
            authorizationToken = headers.authorization.replace('Bearer ', '');
          }

        const userInformation : any = await this.jwtService.decode(authorizationToken)
        if(roles.includes(userInformation && userInformation.role.toLowerCase())){
            return true
        }
        return false 
    }
}