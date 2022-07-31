class ColorizeChecker {
    static SERVICE_NAME = 'colorizeChecker';

    constructor(
        settings
    ) {
        this.settings = settings;
    }

    setSettings(settings) {
        this.settings = settings;
    }

    check(element) {
        return this.settings.find(entry => entry.element === element && entry.enabled === true);
    }

    getFillColor(element) {
        return this.settings.find(entry => entry.element === element).fillColor;
    }

    getStrokeColor(element) {
        return this.settings.find(entry => entry.element === element).strokeColor;
    }
}

export default ColorizeChecker;