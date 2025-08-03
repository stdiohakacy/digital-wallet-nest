import { ENUM_MESSAGE_LANGUAGE } from 'src/common/message/enums/message.enum';
import { registerAs } from '@nestjs/config';

export default registerAs(
  'message',
  (): Record<string, any> => ({
    availableLanguage: Object.values(ENUM_MESSAGE_LANGUAGE),
    language: process.env.APP_LANGUAGE,
  }),
);
