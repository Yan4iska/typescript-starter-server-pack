import { CanActivate, ExecutionContext, NotAcceptableException } from "@nestjs/common";
import { Observable } from "rxjs";

export class AuthorGuard implements CanActivate{
    async canActivate(context: ExecutionContext):  Promise<boolean>  {
        const request = context.switchToHttp().getRequest()
        const {id, type} = request.params
        let entity

        switch (type) {
            case 'problem':
                
                break;
        
            case 'category':
                break;
            default:
                throw new NotAcceptableException('Something not found!')
        }
        return true
    }
}