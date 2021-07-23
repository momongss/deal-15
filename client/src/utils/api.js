import store from '@/utils/store';

import { showAlert } from '@/screens/alert-screen';
import { loadingOn, loadingOff } from '@/screens/loading-screen';

function api(target, options, success, failed, autoLoading = true) {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (store.state.login) {
    headers['Authorization'] = `Bearer ${store.state.login.access}`;
  }

  const data = options.data;
  delete options.data;

  const upload = options.upload;
  delete options.upload;

  let body = null;
  if (data) {
    body = JSON.stringify(data);
  } else if (upload) {
    const formData = new FormData();
    formData.append(upload.name, upload.file);
    body = formData;
    delete headers['Content-Type'];
  }

  const defaultOptions = {
    mode: 'cors',
    cache: 'no-cache',
    headers,
    redirect: 'manual',
  };
  const ops = {
    ...defaultOptions,
    ...options,
    body,
  };

  if (autoLoading) {
    loadingOn();
  }
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
        if (res.status === 201) {
          success();
        } else {
          res.json().then(success);
        }
      }
      return res;
    })
    .catch((res) => {
      const status = res.status;
      if (autoLoading) {
        loadingOff();
      }
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

export function uploadApi(target, upload, success, failed, autoLoading = true) {
  return api(
    target,
    {
      method: 'POST',
      upload,
    },
    success,
    failed,
    autoLoading,
  );
}

export function postApi(target, data, success, failed, autoLoading = true) {
  return api(
    target,
    {
      method: 'POST',
      data,
    },
    success,
    failed,
    autoLoading,
  );
}

export function getApi(target, success, failed, autoLoading = true) {
  return api(
    target,
    {
      method: 'GET',
    },
    success,
    failed,
    autoLoading,
  );
}

export function putApi(target, data, success, failed, autoLoading = true) {
  return api(
    target,
    {
      method: 'PUT',
      data,
    },
    success,
    failed,
    autoLoading,
  );
}

export function deleteApi(target, success, failed, autoLoading = true) {
  return api(
    target,
    {
      method: 'DELETE',
    },
    success,
    failed,
    autoLoading,
  );
}
