import { useCallback } from 'react';
import { notification } from 'antd';

export const useMessage = () => {
  return useCallback((text) => {
    console.log(text);
    if (text) {
      notification.info({
        message: text,
        // description:
        //     'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      });
    }
  }, []);
};