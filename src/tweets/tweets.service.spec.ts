import { Test, TestingModule } from '@nestjs/testing';
import { TweetsService } from './tweets.service';

describe('TweetsService', () => {
  let service: TweetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TweetsService],
    }).compile();

    service = module.get<TweetsService>(TweetsService);
  });

  describe('createTweet', () => {
    it('should create tweet', () => {
      //given
      service.tweets = [];
      const payload = 'This is my tweet';

      //when
      const tweet = service.createTweet(payload);

      //then
      expect(tweet).toBe(payload);
      expect(service.tweets).toHaveLength(1);
    });

    it('should prevent tweets created which are over 100 characters', () => {
      //given
      const payload =
        'This is a long tweet over 100 characters This is a long tweet over 100 characters This is a long t...';

      //when
      const tweet = () => {
        return service.createTweet(payload);
      };

      //then
      expect(tweet).toThrowError();
    });
  });
});
