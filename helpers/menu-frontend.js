

const getMenuFrontend = (role = "USER_ROLE") =>{
    const menu =  [{
        title: "Dashboard",
        icon: "mdi mdi-gauge",
        submenu: [
          {title: "Dashboard", url: "/"},
          {title: "ProgressBar", url: "progress"},
          {title: "Gráficas", url: "grafica"},
          {title: "Promesas", url: "promesas"},
          {title: "Rxjs", url: "rxjs"},
        ]
      },{
        title: "Mantenimientos",
        icon: "mdi mdi-folder-lock-open",
        submenu: [
          {title: "Hospitales", url: "hospitales"},
          {title: "Medicos", url: "medicos"},
        ]
      }
    ];
    if(role === "ADMIN_ROLE"){
        menu[1].submenu.unshift({title: "Usuarios", url: "usuarios"});
    }

    return menu;
}

module.exports = {
    getMenuFrontend
};