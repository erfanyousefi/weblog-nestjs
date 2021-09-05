import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm"
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from "@nestjs/config"
import { CommentModule } from './comment/comment.module';
import { BlogModule } from './blog/blog.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.dev`]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule,],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME')
        }
      }
    }),
    
    BlogModule,
    AuthModule,
    ProfileModule,
    CommentModule,
  ],
})
export class AppModule { }
