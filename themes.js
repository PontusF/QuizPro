//All the colors in the page is dynamic, and set by handleThemeUpdate function.
const root=document.documentElement;

//I know this way of adding an eventlistener is overkill since there's only
//one button, but i use it anyway to learn more.
const themeBtns= document.querySelectorAll('.theme > i');
themeBtns.forEach((korv) => {
  korv.addEventListener('click', handleThemeUpdate)
})

//sets initial values to style.css
root.style.setProperty('--theme-main', 'white')
root.style.setProperty('--theme-secondary', '#76D7d6')
root.style.setProperty('--theme-1', '#f8c5d0')
root.style.setProperty('--theme-2', '#F6E7A3')
root.style.setProperty('--theme-3', '#f7e368')
root.style.setProperty('--theme-4', '#ABE3E5')

var nextTheme ="autumn";


//Changes the page's color sceme based on current one from the "loop":
//light, autumn, dark.
function handleThemeUpdate(e) {
  switch (nextTheme) {
    case 'light':
      root.style.setProperty('--theme-main', 'white')
      root.style.setProperty('--theme-secondary', '#76D7d6')
      root.style.setProperty('--theme-1', '#f8c5d0')
      root.style.setProperty('--theme-2', '#F6E7A3')
      root.style.setProperty('--theme-3', '#f7e368')
      root.style.setProperty('--theme-4', '#ABE3E5')
      nextTheme="autumn";
      break;
    case 'autumn':
      root.style.setProperty('--theme-main', '#2C0402')
      root.style.setProperty('--theme-secondary', ' #EFD13B')
      root.style.setProperty('--theme-1', '#E9AF32')
      root.style.setProperty('--theme-2', '#CF7F26')
      root.style.setProperty('--theme-3', '#CC5B23')
      root.style.setProperty('--theme-4', '#E9AF32')
      nextTheme="dark";
      break;
    case 'dark':
      root.style.setProperty('--theme-main', 'black')
      root.style.setProperty('--theme-secondary', '#93a0ee')
      root.style.setProperty('--theme-1', '#545ba7')
      root.style.setProperty('--theme-2', '#082b5e')
      root.style.setProperty('--theme-3', '#2b395c')
      root.style.setProperty('--theme-4', '#545ba7')
      nextTheme="light";
      break;
  }
}
