import React from 'camunda-modeler-plugin-helpers/react';
import {Modal} from 'camunda-modeler-plugin-helpers/components';
import {v1 as uuidv1} from 'uuid';

const Settings = (props) => {
    const [settings, setSettings] = React.useState(props.settings);

    const updateSettingsEntry = (id, property, value) => {    
        setSettings([
            ...settings.filter(entry => entry.id !== id),
            {
                ...settings.find(entry => entry.id === id),
                [property]: value
            }
        ]);
    };

    const createRow = (entry) => {
        return (
            <fieldset key={entry.id}>
                <div class="fields">
                    <div class="form-group">
                        <div class="custom-control custom-checkbox">
                            <input
                                type="checkbox"
                                class="custom-control-input"
                                id={`enabled-${entry.id}`}
                                name={`enabled-${entry.id}`}
                                checked={entry.enabled}
                                onChange={(event) => updateSettingsEntry(entry.id, 'enabled', event.target.checked)}
                            />
                            <label for={`enabled-${entry.id}`} class="custom-control-label">Enabled</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for={`element-${entry.id}`}>Element</label>
                        <input
                            type="text"
                            class="form-control"
                            id={`element-${entry.id}`}
                            name={`element-${entry.id}`}
                            value={entry.element}
                            onChange={(event) => updateSettingsEntry(entry.id, 'element', event.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label for={`strokeColor-${entry.id}`}>Stroke Color</label>
                        <input 
                            type="text"
                            class="form-control"
                            id={`strokeColor-${entry.id}`}
                            name={`strokeColor-${entry.id}`}
                            value={entry.strokeColor}
                            onChange={(event) => updateSettingsEntry(entry.id, 'strokeColor', event.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label for={`fillColor-${entry.id}`}>Fill Color</label>
                        <input
                            type="text"
                            class="form-control"
                            id={`fillColor-${entry.id}`}
                            name={`fillColor-${entry.id}`}
                            value={entry.fillColor}
                            onChange={(event) => updateSettingsEntry(entry.id, 'fillColor', event.target.value)}
                        />
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={() => setSettings(settings.filter(e => e.id !== entry.id))}
                    >
                        Remove
                    </button>
                </div>
            </fieldset>
        );
    };

    return (
        <Modal onClose={props.onClose}>
            <Modal.Title>
                Auto Colorize Configuration
            </Modal.Title>
            <Modal.Body>
                <button
                    className="btn btn-primary"
                    onClick={() => setSettings([...settings, {
                        id: uuidv1(),
                        enabled: false,
                        element: '',
                        strokeColor: '',
                        fillColor: ''
                    }])}
                >
                    Add Entry
                </button>
                {settings.sort().map((entry, index) => createRow(entry, index))}
            </Modal.Body>
            <Modal.Footer>
                <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={props.onClose}
                >
                    Cancel
                </button>
                <button 
                    type="submit"
                    className="btn btn-primary"
                    onClick={() => props.onSave(settings)}
                >
                    Save
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default Settings;