import { useCallback } from 'react';
import { notification } from 'antd';

export const useMessage = () => {
  return useCallback((text) => {
    if (text) {
      notification.info({
        message: text,
      });
    }
  }, []);
};
