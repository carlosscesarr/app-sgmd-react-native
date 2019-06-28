import Courses from './pages/Courses';
import Disciplines from './pages/Disciplines';
import Modules from './pages/Modules';
import Resources from './pages/Resources';
import Login from './pages/Login';
import AuthOrApp from './components/AuthOrApp';
import Register from './pages/Register';

import { createStackNavigator, createAppContainer, createDrawerNavigator, createSwitchNavigator  } from 'react-navigation';
 
const MenuRoutes = {
    Courses: {
        name: 'Courses',
        screen: Courses,
        title: 'Cursos',
    },
}

const MenuConfig = {
    initialRouteName: 'Courses',
    contentOptions: {
        fontSize: 20 
    },
}

const MenuNavigator = createAppContainer(createDrawerNavigator(MenuRoutes, MenuConfig));

const MainRoutes = {
    Loading: {
        name: 'Loading',
        screen: AuthOrApp,
    },
    Login: {
        name: 'Login',
        screen: Login,
        navigationOptions: {
           header: null,
        }
    },
    Register: {
        name: 'Register',
        screen: Register,
        navigationOptions: {
            header: null,
        }
    },
    Courses: {
        name: 'Courses',
        screen: MenuNavigator,
        navigationOptions: {
            header: null,
        }
    },
    Modules: {
        name: 'Modules',
        screen: Modules,
        title: 'Módulos',
    },
    Disciplines: {
        name: 'Disciplines',
        screen: Disciplines,
        title: 'Disciplinas',
    },
    Resources: {
        name: 'Resources',
        screen: Resources,
        title: 'Recursos',
    }
}

const MainNavigator = createSwitchNavigator(MainRoutes,
    { 
        initialRouteName: 'Loading'    
    }
);

export default createAppContainer(MainNavigator);
