import { afterAll, afterEach, beforeAll, describe, expect, test, vi } from 'vitest'
import { serverOf } from '../src/server'
import * as TodoRepo from '../src/repo/todo'

describe('Todo API Testing', () => {
  const server = serverOf()

  afterEach(() => {
    vi.resetAllMocks()
  })

  test('When sending a POST request to /api/v1/todos with todo data, Then it should create a new todo and return it', async () => {
    const newTodo = { name: 'New Task', description: 'Description of new task' };
    
    const createTodoSpy = vi.spyOn(TodoRepo, 'createTodo').mockImplementation(async (todo) => ({
      id: '1',
      ...todo,
    }));
  
    const response = await server.inject({
      method: 'POST',
      url: '/api/v1/todos',
      payload: newTodo
    });
    
    // console.log(response)
    expect(response.statusCode).toBe(201);
    const responseData = JSON.parse(response.body);
    expect(responseData.todo).toBeDefined();
    expect(responseData.todo.id).toBe('1');
    expect(responseData.todo.name).toBe(newTodo.name);
    expect(responseData.todo.description).toBe(newTodo.description);
  
    expect(createTodoSpy).toHaveBeenCalledOnce();
  
    createTodoSpy.mockRestore();
  });
  
})
