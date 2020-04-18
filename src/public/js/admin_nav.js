// If the user is not an admin removes the admin page option from the navbar.
(async () => {
    const admin_data = await ((await fetch("/admin/verify")).json());
    if (!admin_data.admin) {
        $("#admin-nav").addClass("d-none");
    } else {
        $("#admin-nav").removeClass("d-none");
    }
})().catch(err => {
    console.error(err);
});

async function test() {
    const admin_data = await ((await fetch("/admin/verify")).json());
    if (!admin_data.admin) {
        $("#admin-nav").addClass("d-none");
    } else {
        $("#admin-nav").removeClass("d-none");
    }
}