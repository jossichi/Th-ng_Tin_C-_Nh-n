var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-content");

function opentab(tabname) {
    for (tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
        if (tabcontent.id === tabname) {
            tabcontent.classList.add("active-tab");
        }
    }
    event.currentTarget.classList.add("active-link");
    document.getElementsById(tabname).classList.add("active-tab");
}
