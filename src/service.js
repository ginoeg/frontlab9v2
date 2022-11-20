const urlbase = "http://localhost:3000/api";

async function get(url) {
  try {
    const response = await fetch(`${urlbase}${url}`);
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function post(url, body) {
  try {
    const response = await fetch(`${urlbase}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function remove(url, id) {
  try {
    const response = await fetch(`${urlbase}${url}`+`/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then( res => res.json() )
    .then( ()=> location.reload());
  } catch (error) {
    console.log(error);
  }
}

async function put(url, id, body) {
  try {
    await fetch(`${urlbase}${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then( response => response.json() )
    .then( response => location.reload() )
  } catch (error) {
    console.log(error);
  }
}
