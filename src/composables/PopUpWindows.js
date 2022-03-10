export default function popUpWindow(){

  const addWindow = (urlExample) =>{
    var left = (screen.width - 400)/2;
    var top = (screen.height - 650)/4;

    window.open(urlExample, "Tittle", 'resizable=0, width=' + 400 +', height=' + 650 + ', top=' + top + ',left=' + left)
  }

  const mediumWindow = (urlExample) =>{
    var left = (screen.width - 600)/2;
    var top = (screen.height - 750)/4;

    window.open(urlExample, "Tittle", 'resizable=0, width=' + 600 +', height=' + 750 + ', top=' + top + ',left=' + left)
  }

  return{
    addWindow,
    mediumWindow
  }
}
