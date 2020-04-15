// If the user is not an admin removes the admin page option from the navbar.
(async () => {
    const admin_data = await ((await fetch("/admin/verify")).json());
    if (!admin_data.admin) {
        document.getElementById("admin-nav").remove();
    }
})().catch(err => {
    console.error(err);
});
