export const request = {};

let csrfToken = document.querySelector('meta[name="csrf-token"]').content;


request.post = async (path, data = {})=>{

}

request.get = async (path, data = {}) => {

    const url = new URL(window.origin  + path);
    url.search = new URLSearchParams(data);

    let response = await fetch(url)
    if (response.status === 200 || response.status === 201 ) {
        return  await response.json();
    } else {
        const content = await response.json();
        webToast.Danger({
            status: "Sorry !",
            message: content.message ? content.message : "Something went wrong"
        });
        return false;
    }
}