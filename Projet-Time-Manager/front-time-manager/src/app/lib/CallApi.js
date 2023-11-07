export const authRequest = async (endpoint, data = {}, method = "POST", headers = {}) => {
  
  let header = new Headers();
  // if( localStorage.getItem('user') == "null")
  //     window.location = '/denied'
  
  header.append("Content-Type", "application/json");
  let resToken = await fetch(process.env.API_HUB + '/users/jwt/' + localStorage.getItem('user'))
    .then(res => res.json())
    .then(res => res)
  header.append("Authorization", "Bearer " + resToken.data.token);
  let option = {
    method: method,
    body: JSON.stringify(data),
    mode: 'cors',
    headers: header,
    // credentials:'include'
  }
  if (method === 'GET')
    delete (option.body)
  if (headers.length < 1)
    header = headers;
  let response = await fetch(process.env.API_HUB + '/' + endpoint, option)
    .then(res => {
      if (res.status !== 200 && res.status !== 201 && res.status !== 400)
        return false;
      else {
        return res.json();
      }
    })
    .then(res => {
      if (res)
        return res
      else
        return false
    })
    .catch(err => {
      console.log(err.message)
    })
  return response;
}

export const publicRequest = async (endpoint, data = {}, method = 'GET', headers = {}) => {
  
  let header = new Headers();
  header.append("Content-Type", "application/json");
  
  if (Object.keys(headers).length > 0)
    header = headers;
  
  let option = {
    method: method,
    headers: header,
    // credentials:'include'
  }
  if (Object.keys(data).length > 0)
    option.body = JSON.stringify(data);
  let response = await fetch(process.env.API_HUB + '/' + endpoint, option)
    .then(res => {
      //console.log(res)
      if (res.status !== 200 && res.status !== 201 && res.status !== 400) {
        return res.json();
      } else {
        return res.json();
      }
    })
    .then(res => {
      if (res)
        return res
      else {
        return false;
      }
    })
    .catch(err => console.log(err.message))
  return response;
}
export const publicRequest2 = async (endpoint, data = {}, method = 'GET', headers = {}) => {
  
  let header = new Headers();
  header.append("Content-Type", "application/json");
  
  if (Object.keys(headers).length > 0)
    header = headers;
  
  let option = {
    method: method,
    headers: header,
    // credentials:'include'
  }
  if (Object.keys(data).length > 0)
    option.body = JSON.stringify(data);
  let response = await fetch(process.env.API_HUB + '/' + endpoint, option)
    .then(res => {
      //console.log(res)
      if (res.status !== 200 && res.status !== 201 && res.status !== 400) {
        return res.json();
      } else {
        return res.json();
      }
    })
    .then(res => {
      if (res)
        return res
      else {
        return false;
      }
    })
    .catch(err => console.log(err.message))
  return response;
}
