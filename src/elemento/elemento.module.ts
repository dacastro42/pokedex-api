import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElementoService } from './elemento.service';
import { ElementoController } from './elemento.controller';
import { Elemento } from 'src/common/entities/elemento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Elemento])],
  controllers: [ElementoController],
  providers: [ElementoService],
})
export class ElementoModule {}
