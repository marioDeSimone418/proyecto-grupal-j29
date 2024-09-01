const links = document.getElementById("template-links")
const navbar = document.getElementById("nav-links")
//add links to navbar 
navbar.appendChild(document.importNode(links.content, true))

const button = document.getElementById("menu-button")

class pos {
    static left(element) {
        return element.getBoundingClientRect().left
    }
    static top(element) {
        return element.getBoundingClientRect().top
    }
    static width(element) {
        return element.getBoundingClientRect().width
    }
    static height(element) {
        return element.getBoundingClientRect().height
    }
}

function menuPosition(menu, button) {
    const verticalGap = 10
    const horizontalGap = 0
    if (menu && button) {
        menu.style.left = (pos.left(button) - pos.width(menu) + pos.width(button) + horizontalGap) + "px"
        menu.style.top = (pos.top(button) + pos.height(button) + verticalGap) + "px"
    } else {
        console.error("error: missing elements");
    }
}

window.addEventListener("resize", () => {
    if (document.getElementById("menu")) {
        menuPosition(document.getElementById("menu"), button)
    }
})

button.onclick = () => {
    if (!document.getElementById("menu")) {
        const menuElement = document.importNode(document.getElementById("collapse-menu").content, true)
        if (window.innerWidth < 1000) {
            menuElement.querySelector("#menu").appendChild(document.importNode(links.content, true))
        }
        document.body.appendChild(menuElement)
        
        document.getElementById("menu").classList.add("expanded")
        menuPosition(menu, button)
    } else {
        const menu = document.getElementById("menu")
        if (menu.classList.contains("expanded")) menu.classList.remove("expanded")
        menu.classList.add("collapsed")
        const animations = menu.getAnimations()
        Promise.all(animations.map(anim => anim.finished)).then(() => menu.remove())
    }
}