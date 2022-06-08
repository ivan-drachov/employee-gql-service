import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/project/entities/project.entity';
import { ProjectService } from 'src/project/project.service';
import { Repository } from 'typeorm';
import { EmployeeCreateDTO } from './dto/create-employee.input';
import { EmployeeUpdateDTO } from './dto/update-employee.input';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {

    constructor(@InjectRepository(Employee) private employeeRepository: Repository<Employee>, private projectService: ProjectService){}
    
    async findAll(): Promise<Employee[]>{
        return this.employeeRepository.find();
    }

    async findOne(id: string){
        return this.employeeRepository.findOne({where:{id}})
    }

    async create(employee: EmployeeCreateDTO): Promise<Employee>{
        let emp = this.employeeRepository.create(employee)
        return this.employeeRepository.save(emp)
    }

    async update(id: string, employee: EmployeeUpdateDTO): Promise<Employee>{
        let empl = await this.employeeRepository.findOne({where: {id}});
        return this.employeeRepository.save({
        ...empl, 
        ...employee
    });
    }

    async delete(id: string){
        let empl = await this.employeeRepository.findOne({where: {id}});
        this.employeeRepository.remove(empl)
        return empl
    }

    async getProject(id: string): Promise<Project>{
        return this.projectService.findOne(id)
    }
}
