import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(
        private reflector : Reflector
    ){}

    async canActivate(context : ExecutionContext):  Promise<boolean>  {
        const roles = this.reflector.get<string[]>('roles', context.getHandler())
        console.log("roles",roles)
        return false 
    }
}