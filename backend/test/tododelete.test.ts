import { afterAll, afterEach, beforeAll, describe, expect, test, vi } from 'vitest'
import { serverOf } from '../src/server'
import * as TodoRepo from '../src/repo/todo'

describe('Todo API Testing', () => {
  const server = serverOf()

  afterEach(() => {
    vi.resetAllMocks()
  })

  test('When sending a DELETE request to /api/v1/todos/:id, Then it should delete the todo and return a 204 status code', async () => {
    const todoId = '1';
    const deleteTodoByIdSpy = vi.spyOn(TodoRepo, 'deleteTodoById').mockImplementation(async (id) => ({
      acknowledged: true,
      deletedCount: 1,
    }));
  
    const response = await server.inject({
      method: 'DELETE',
      url: `/api/v1/todos/${todoId}`,
    });
    
    console.log(response);
    expect(response.statusCode).toBe(204);
  
    expect(deleteTodoByIdSpy).toHaveBeenCalledWith(todoId);
    expect(deleteTodoByIdSpy).toHaveBeenCalledOnce();
  
    deleteTodoByIdSpy.mockRestore();
  });
})
