import { ParsePokemonIdPipe } from './parse-pokemon-id.pipe';
import { BadRequestException } from "@nestjs/common";

describe('ParsePokemonIdPipe', () => {
  let pipe: ParsePokemonIdPipe;

  beforeEach(() => {
    pipe = new ParsePokemonIdPipe();
  });

  it('should be defined', () => {
    expect(new ParsePokemonIdPipe()).toBeDefined();
  });

  it('should throw error for non number', () => {
    const value = () => pipe.transform('non number');
    expect(value).toThrowError(BadRequestException);
  });

  it('should throw error if number less than 1', () => {
    const value = () => pipe.transform('-1');
    expect(value).toThrowError(BadRequestException);
  });

  it('should throw error if number greater than 151', () => {
    const value = () => pipe.transform('152');
    expect(value).toThrowError(BadRequestException);
  });

  it('should return number if between 1 and 151', () => {
    const value = pipe.transform('10');
    expect(value).toBe(10);
  });
});
