import { createParamDecorator, ExecutionContext} from "@nestjs/common";

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const rq = ctx.switchToHttp().getRequest()
    
    if(!rq.user) return null

    //if(data) return rq.user[data]

    return rq.user
})