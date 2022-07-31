import React from 'camunda-modeler-plugin-helpers/react';
import {Fill} from 'camunda-modeler-plugin-helpers/components';
import Settings from './Settings';
import ColorizeModule from './ColorizeModule';
import ColorizeChecker from './ColorizeChecker';

const AutoColorizePlugin = (props) => {
    const [settingModalOpen, setSettingsModalOpen] = React.useState(false);
    const [settings, setSettings] = React.useState([]);
    const [colorizeChecker, setColorizeChecker] = React.useState(new ColorizeChecker(settings));

    const saveSettings = (newSettings) => {
        props.config.setForPlugin('autoColorize', 'settings', newSettings);
        setSettings(newSettings);
        colorizeChecker.setSettings(newSettings);
    };

    React.useEffect(() => {
        props.config.getForPlugin('autoColorize', 'settings').then(loadedSettings => {            
            setSettings(loadedSettings || []);
            colorizeChecker.setSettings(loadedSettings);
        });

        props.subscribe('bpmn.modeler.configure', (event) => {
            event.middlewares.push(config => {    
                const colorizeCheckerModule = {
                    __init__: [ColorizeChecker.SERVICE_NAME],
                    [ColorizeChecker.SERVICE_NAME]: ['value', colorizeChecker]
                };

                const additionalModules = config.additionalModules || [];
        
                return {
                    ...config,
                    additionalModules: [
                        ...additionalModules,
                        ColorizeModule,
                        colorizeCheckerModule
                    ]
                };
            });
        });

        props.subscribe('auto-colorize-plugin:setting-open', () => {
            setSettingsModalOpen(true);
        });
    }, []);

    return (
        <>
            <Fill slot="status-bar__app" group="1_autocolorize">
                <button
                    title="Open autocolorize settings"
                    onClick={() => setSettingsModalOpen(true)}
                >
                    Auto Colorize Settings
                </button>
            </Fill>
            {settingModalOpen && (
                <Settings 
                    onClose={() => setSettingsModalOpen(false)}
                    settings={settings}
                    onSave={(newSettings) => saveSettings(newSettings)}
                />
            )}
        </>
    );
};

export default AutoColorizePlugin;