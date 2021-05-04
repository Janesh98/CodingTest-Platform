import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  // make a submission to the remote code execution API
  // and wait for return
  var url = 'http://localhost:8000/submission';
  var payload = JSON.stringify({
    data: {
      code:
        'aW1wb3J0IHN5cwoKZGVmIHNvbHV0aW9uKHMpOgoJcmV0dXJuIHN1bShbaW50KG4pIGZvciBuIGluIHNdKQoKZGVmIG1haW4oKToKCWZvciBsaW5lIGluIHN5cy5hcmd2WzE6XToKCQlsaW5lID0gbGluZS5zdHJpcCgpCgkJcHJpbnQoc29sdXRpb24obGluZSkpCgppZiBfX25hbWVfXyA9PSAnX19tYWluX18nOgoJbWFpbigp',
      input: 'MTIz',
      language: 'python',
      wait: true,
    },
  });
  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  let res = http.post(url, payload, params);
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
