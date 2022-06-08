import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {

  constructor(@InjectRepository(Project) private projectRepository: Repository<Project>){}

  create(createProjectInput: CreateProjectInput): Promise<Project> {
    let proj = this.projectRepository.create(createProjectInput)
    return this.projectRepository.save(proj);
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find({
      relations: ["employees"]
    }
    );
  }

  async findOne(id: string): Promise<Project> {
    return this.projectRepository.findOne({where:{id}, relations: ["employees"]});
  }

  async update(id: string, updateProjectInput: UpdateProjectInput){

    let proj = await this.projectRepository.findOne({where: {id}});
    return this.projectRepository.save({
      ...proj, 
      ...updateProjectInput
    });
  }

  async remove(id: string){
    let proj = await this.projectRepository.findOne({where: {id}});
    this.projectRepository.remove(proj)
    return proj
  }
}
