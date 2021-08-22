import { Module } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';
import { TypeOrmModule } from "@nestjs/typeorm"
import { AuthModule } from './auth/auth.module';
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
  }), AuthModule],
})
export class AppModule { }
