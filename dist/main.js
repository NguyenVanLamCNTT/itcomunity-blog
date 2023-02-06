"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const dist_1 = require("@nestjs/swagger/dist");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('ITCommunity API')
        .setDescription('')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = dist_1.SwaggerModule.createDocument(app, config);
    dist_1.SwaggerModule.setup('api/swagger', app, document);
    await app.listen(configService.get('port'));
}
bootstrap();
//# sourceMappingURL=main.js.map