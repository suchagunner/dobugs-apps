import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

class TypeOrmModuleSingleton {
  private static instance: TypeOrmModuleSingleton;

  private constructor() {}

  public static getInstance() {
    return TypeOrmModuleSingleton.instance ?? new TypeOrmModuleSingleton();
  }

  public getModule() {}
}
