import { createParamDecorator, ExecutionContext} from "@nestjs/common";

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
    const rq = ctx.switchToHttp().getRequest()
    if(!rq.user) return null
    return data ? rq.user[data] : rq.user
})