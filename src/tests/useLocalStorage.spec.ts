// @ts-ignore
import {renderHook} from '@testing-library/react-hooks';
import {useLocalStorage} from '../hooks/useLocalStorage';
import {act} from '@testing-library/react';

test('should clear storage', () => {
  const {result} = renderHook(() => useLocalStorage('test', 'test'));

  act(() => {
    result.current.setStorage()
  })

  expect(result.current.getStorage()).toBe('test');
})
