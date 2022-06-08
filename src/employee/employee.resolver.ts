import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Project } from 'src/project/entities/project.entity';
import { EmployeeCreateDTO } from './dto/create-employee.input';
import { EmployeeUpdateDTO } from './dto/update-employee.input';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';

@Resolver(()=> Employee)
export class EmployeeResolver {

    constructor(private employeeService: EmployeeService){}

    @Query(()=>[Employee], {name: "getAllEmployees"})
    findAll(){
        return this.employeeService.findAll();
    }

    @Query(()=>Employee)
    getEmployeeById(@Args('id') id: string){
        return this.employeeService.findOne(id)
    }

    @Mutation(()=> Employee, {name: "createEmployee"})
    create(@Args('employee') employee: EmployeeCreateDTO){
        return this.employeeService.create(employee)
    }

    @Mutation(()=> Employee, {name: "updateEmployeeById"})
    update(@Args('id') id: string, @Args('employee') employee: EmployeeUpdateDTO){
        return this.employeeService.update(id, employee)
    }

    @Mutation(()=> Employee, {name: "deleteEmployeeById"})
    delete(@Args('id') id: string){
        return this.employeeService.delete(id)
    }

    @ResolveField(() => Project)
    project(@Parent() employee: Employee){
        return this.employeeService.getProject(employee.projectId)
    }
}
