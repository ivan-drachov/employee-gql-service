import { Field, InputType } from "@nestjs/graphql"
@InputType()
export class EmployeeUpdateDTO{

    @Field()
    firstName: string
    @Field()
    lastName: string
    @Field()
    designamtion: string
    @Field({nullable: true})
    city: string
    
    @Field()
    projectId: string
}