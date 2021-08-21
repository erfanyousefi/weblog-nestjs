import { Module } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';
import { TypeOrmModule } from "@nestjs/typeorm"
@Module({
  imports: [BlogModule, TypeOrmModule.forRoot({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "weblogDB",
    autoLoadEntities: true,
    synchronize: true
  })],
})
export class AppModule { }
