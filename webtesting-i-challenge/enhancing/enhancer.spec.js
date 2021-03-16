const enhancer = require('./enhancer.js');

describe('Check if success function works as expected', () => {
  it('should increase durability by one', () => {
    const item = {name: 'thing', durability: 80, enhancement: 4}
    const newItem =  enhancer.success(item);
    expect(newItem.enhancement).toBe(5);
  })
  it('should not increase durability by one when 20', () => {
    const item = { name: 'thing', durability: 80, enhancement: 20 }
    const newItem = enhancer.success(item);
    expect(newItem.enhancement).toBe(20);
  })
})


describe('Check if repair function works as expected', () => {
  it('should increase durability to 100', () => {
    const item = { name: 'thing', durability: 80, enhancement: 4 }
    const newItem = enhancer.repair(item);
    expect(newItem.durability).toBe(100);
  })
  it('should not increase durability when 100', () => {
    const item = { name: 'thing', durability: 100, enhancement: 20 }
    const newItem = enhancer.repair(item);
    expect(newItem.durability).toBe(100);
  })
})

describe('Check if fail function works as expected', () => {
  it('should decrease durability to by 5 when enhancement is less than 15', () => {
    const item = { name: 'thing', durability: 80, enhancement: 12 }
    const newItem = enhancer.fail(item);
    expect(newItem.durability).toBe(75);
  })
  it('should decrease durability by 10 and enchancement by 1 when enhancement is greater than 16', () => {
    const item = { name: 'thing', durability: 100, enhancement: 20 }
    const newItem = enhancer.fail(item);
    expect(newItem.durability).toBe(90);
    expect(newItem.enhancement).toBe(19);
  })
  it('should decrease durability by 10 and not decrease enhancement by 1 when enhancement is 15', () => {
    const item = { name: 'thing', durability: 100, enhancement: 15 }
    const newItem = enhancer.fail(item);
    expect(newItem.durability).toBe(90);
    expect(newItem.enhancement).toBe(15);
  })
})

describe('Check if get() works as expected', () => {
  it('get() should change name appropriately', () => {
    const item = { name: 'thing', durability: 80, enhancement: 4 }
    const newItem = enhancer.get(item);
    expect(newItem.name).toBe('[+4] thing');
  })

  it('get() should not change name if enhancement is 0', () => {
    const item = { name: 'thing', durability: 80, enhancement: 0 }
    const newItem = enhancer.get(item);
    expect(newItem.name).toBe('thing');
  })
})