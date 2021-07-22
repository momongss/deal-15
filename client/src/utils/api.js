import store from '@/utils/store';

import { showAlert } from '@/screens/alert-screen';
import { loadingOn, loadingOff } from '@/screens/loading-screen';

function api(target, options, success, failed) {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (store.state.login) {
    headers['Authorization'] = `Bearer ${store.state.login.access}`;
  }

  const data = options.data;
  delete options.data;

  const defaultOptions = {
    mode: 'cors',
    cache: 'no-cache',
    headers,
    redirect: 'manual',
    body: data && JSON.stringify(data),
  };
  const ops = {
    ...defaultOptions,
    ...options,
  };

  loadingOn();
  return fetch(`${process.env.API_BASE}${target}`, ops)
    .then((res) => {
      const n = (res.status / 100) | 0;
      if (n === 4 || n === 5) {
        throw res;
      }
      return res;
    })
    .then((res) => {
      loadingOff();
      if (success) {
        res.json().then(success);
      }
      return res;
    })
    .catch((res) => {
      const status = res.status;
      loadingOff();
      if (failed && status in failed) {
        failed[status]();
      } else {
        showAlert({
          message: '처리할 수 없는 에러가 발생했습니다.',
        });
      }
      return res;
    });
}

export function postApi(target, data, success, failed) {
  return api(
    target,
    {
      method: 'POST',
      data,
    },
    success,
    failed,
  );
}

export function getApi(target, success, failed) {
  return api(
    target,
    {
      method: 'GET',
    },
    success,
    failed,
  );
}

export function putApi(target, data, success, failed) {
  return api(
    target,
    {
      method: 'PUT',
      data,
    },
    success,
    failed,
  );
}

export function deleteApi(target, success, failed) {
  return api(
    target,
    {
      method: 'DELETE',
    },
    success,
    failed,
  );
}
