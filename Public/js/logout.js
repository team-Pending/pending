const logoutHandler = async(event) => {
    console.log('script fired')
    const response = await fetch('/user/logout', { method: "POST" })
    if (response.ok) {
        document.location.replace('/login');
    } else {
        alert(response.statusText);
    }
}