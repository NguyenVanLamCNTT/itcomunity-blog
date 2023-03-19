import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAIApi } from 'openai';
import { CreateCompletionRequest } from 'openai/dist/api';
import { Configuration } from 'openai/dist/configuration';
import { ChatGPTConstants } from 'src/domain/constants';

@Injectable()
export class GPTUtil {
  private readonly openAI: OpenAIApi;
  constructor(private configService: ConfigService) {
    this.openAI = new OpenAIApi(
      new Configuration({
        organization: this.configService.get('gpt.organnizationId'),
        apiKey: this.configService.get('gpt.apiKey'),
      }),
    );
  }

  async getModelAnswer(question: string) {
    try {
      const params: CreateCompletionRequest = {
        prompt: question,
        model: ChatGPTConstants.DEFAULT_MODEL_ID,
        temperature: ChatGPTConstants.DEFAULT_TEMPERATURE,
        max_tokens: 2014,
      };
      const response = await this.openAI.createCompletion(params);
      return response.data.choices[0].text;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
