import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';

// Screens
import HomeScreen from './HomeScreen';
import PostsScreen from './PostsScreen';
import SettingsScreen from './SettingsScreens';

// Colors
import { colors } from '../src/theme';

const MyComponent = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
        { key: 'posts', title: 'Posts', focusedIcon: 'post', unfocusedIcon: 'post-outline' },
        { key: 'settings', title: 'Settings', focusedIcon: 'cog', unfocusedIcon: 'cog-outline' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: HomeScreen,
        posts: PostsScreen,
        settings: SettingsScreen,
    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            barStyle={{ backgroundColor: colors.primary }}
            activeColor={colors.darkLetter}
            activeIndicatorStyle={{ backgroundColor: colors.success, width: '200%' }}
            inactiveColor={colors.lightLetter}



        />
    );
};

export default MyComponent;